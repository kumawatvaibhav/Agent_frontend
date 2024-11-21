'use client';

import * as React from 'react'
import { Moon, Plus, Search, Sun, Users, Settings, HelpCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Agent {
  agent_id: string
  agent_name: string
  interruption_sensitivity: number
  language: string
  voice_id: string
}

export default function Home() {
  const router = useRouter()
  const [agents, setAgents] = React.useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = React.useState<Agent[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [agentsPerPage] = React.useState(6)

  const fetchAgents = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.retellai.com/list-agents`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch agents')
      }

      const data = await response.json()
      setAgents(data)
      setFilteredAgents(data)
    } catch (err) {
      setError('An error occurred while fetching agents. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  React.useEffect(() => {
    const filtered = agents.filter(agent =>
      agent.agent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.language.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredAgents(filtered)
    setCurrentPage(1)
  }, [searchQuery, agents])

  // Pagination logic
  const indexOfLastAgent = currentPage * agentsPerPage
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage
  const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent)
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 to-pink-0 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <SidebarProvider>
        <div className="flex flex-1">
          <Sidebar className="w-64 border-r border-purple-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <SidebarHeader className="p-4 flex items-center justify-between bg-gray-500 dark:bg-purple-700 text-white">
              <h2 className="text-lg font-bold">Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="w-full flex items-center justify-between p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition">
                        <div className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
                          <span>Agents</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="pl-8 py-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition">
                        View All
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="pl-8 py-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition">
                        Add New
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </CollapsibleContent>
                </Collapsible>
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition">
                    <Settings className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="flex items-center p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md transition">
                    <HelpCircle className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-400" />
                    <span>Help</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-black dark:text-purple-300">Welcome to Your Agent Dashboard</h1>
                <p className="text-xl text-gray-600">Manage and monitor your AI agents with ease</p>
                <div className="flex items-center max-w-md mx-auto">
                  <Input
                    type="search"
                    placeholder="Search agents..."
                    className="flex-1 border-purple-300 dark:border-purple-700 focus:ring-purple-500 dark:focus:ring-purple-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" className="ml-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-black">Your Agents</h2>
                {isLoading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                      <Card key={index} className="bg-white">
                        <CardHeader>
                          <Skeleton className="h-6 w-2/3 bg-gray-600" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-4/5" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500">{error}</div>
                ) : (
                  <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {currentAgents.map((agent) => (
                        <Link href={`/agents/${agent.agent_id}`} key={agent.agent_id}>
                          <Card className="bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                              <CardTitle className="text-black">{agent.agent_name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p><strong className="text-gray-600">ID:</strong> {agent.agent_id}</p>
                              <p><strong className="text-gray-600">Language:</strong> {agent.language}</p>
                              <p><strong className="text-gray-600">Voice ID:</strong> {agent.voice_id}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <Button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <span className="mx-4 flex items-center text-purple-700 dark:text-purple-300">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </section>
            </div>
          </main>
        </div>
      </SidebarProvider>
      
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600"
        size="icon"
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add new agent</span>
      </Button>
    </div>
  )
}