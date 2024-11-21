'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

interface AgentDetails {
  agent_id: string
  agent_name: string
  language: string
  voice_id: string
  interruption_sensitivity: number
  initial_message?: string
  voice_speed?: number
}

interface Voice {
  voice_id: string
  name: string
  language: string
  gender: string
}

export default function Component() {
  const params = useParams<{ id?: string }>()
  const agentId = params?.id

  const [agentDetails, setAgentDetails] = useState<AgentDetails | null>(null)
  const [voices, setVoices] = useState<Voice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('')

  if (!agentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: No agent ID provided</p>
      </div>
    )
  }

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        const response = await fetch(`https://api.retellai.com/get-agent/${agentId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Path': agentId,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('Failed to fetch agent details')

        const data = await response.json()
        setAgentDetails(data)
        setName(data.agent_name)
        setPrompt(data.initial_message || '')
        setSelectedVoice(data.voice_id)
      } catch (err) {
        setError('Failed to load agent details')
      }
    }

    const fetchVoices = async () => {
      try {
        const response = await fetch('https://api.retellai.com/get-voice/11labs-Myra', {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) throw new Error('Failed to fetch voices')

        const data = await response.json()
        // Ensure voices is an array
        setVoices(Array.isArray(data) ? data : [])
      } catch (err) {
        setError('Failed to load voices')
      } finally {
        setIsLoading(false)
      }
    }

    if (agentId) {
      fetchAgentDetails()
      fetchVoices()
    }
  }, [agentId])

  const handleUpdateAgent = async () => {
    if (!agentId) return
    try {
      const response = await fetch(`https://api.retellai.com/agents/${agentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_name: name,
          initial_message: prompt,
          voice_id: selectedVoice
        })
      })

      if (!response.ok) throw new Error('Failed to update agent')

      // Refresh agent details
      const data = await response.json()
      setAgentDetails(data)
    } catch (err) {
      setError('Failed to update agent')
    }
  }

  const handleCall = async () => {
    if (!agentId) return
    try {
      const response = await fetch('https://api.retellai.com/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: agentId,
          customer_number: phoneNumber
        })
      })

      if (!response.ok) throw new Error('Failed to initiate call')

      // Handle successful call initiation
      console.log('Call initiated successfully')
    } catch (err) {
      setError('Failed to initiate call')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container">
          <h1 className="text-2xl font-bold text-center">{agentDetails?.agent_name || 'Agent Details'}</h1>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr_300px]">
          {/* Left Sidebar - Voice Selection */}
          <Card className="p-4 space-y-4">
            <h2 className="font-semibold">Select Voice</h2>
            <div className="space-y-2">
              {voices.map((voice) => (
                <button
                  key={voice.voice_id}
                  className={`w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent text-left ${
                    selectedVoice === voice.voice_id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedVoice(voice.voice_id)}
                >
                  <span>{voice.name}</span>
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                    {voice.gender}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Main Content */}
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here"
                  className="min-h-[200px]"
                />
              </div>
              <Button onClick={handleUpdateAgent}>
                Update Agent
              </Button>
            </div>
          </Card>

          {/* Right Sidebar - Actions */}
          <div className="space-y-4">
            <Tabs defaultValue="call" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="call">Test Call</TabsTrigger>
                <TabsTrigger value="chat">Test Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="call" className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Phone Number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">+1 (555) 000-0000</SelectItem>
                    <SelectItem value="2">+1 (555) 000-0001</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                />
                <Button
                  className="w-full"
                  onClick={handleCall}
                >
                  Call Me
                </Button>
              </TabsContent>
              <TabsContent value="chat">
                <Card className="p-4">
                  <p className="text-center text-muted-foreground">Chat interface coming soon</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}