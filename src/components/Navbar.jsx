import * as React from "react"
import { Link } from "react-router-dom"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon, User, LogOut, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useClerk } from "@clerk/clerk-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "bn", name: "বাংলা" },
]

export function Navbar() {
  const isMobile = useIsMobile()
  const { signOut, user } = useClerk()
  const [selectedLanguage, setSelectedLanguage] = React.useState("en")

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b border-[#3A7573]/30 bg-[#1C4645] text-white relative z-50"
    >
      <div className="flex h-16 items-center px-4 w-full">
        <div className="flex items-center gap-4 flex-1">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3A7573] to-[#5cdbd6]"
              >
                <span className="font-bold text-white">A</span>
              </motion.div>
              <span className="hidden font-bold sm:inline-block text-lg tracking-tight">
                ADVYON
              </span>
            </Link>
          </div>
          <NavigationMenu viewport={isMobile}>
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#3A7573]/20 hover:text-white focus:bg-[#3A7573]/20 focus:text-white data-[active]:bg-[#3A7573]/20 data-[state=open]:bg-[#3A7573]/20">Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-[#1C4645] border border-[#3A7573]/30 p-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-[#3A7573]/20 to-[#3A7573]/10 p-4 no-underline outline-none transition-all duration-200 select-none hover:shadow-md focus:shadow-md md:p-6 border border-[#3A7573]/30"
                          to="/"
                        >
                          <div className="mb-2 text-lg font-medium sm:mt-4 text-white">
                            shadcn/ui
                          </div>
                          <p className="text-[#B0C4C3] text-sm leading-tight">
                            Beautifully designed components built with Tailwind CSS.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#3A7573]/20 hover:text-white focus:bg-[#3A7573]/20 focus:text-white data-[active]:bg-[#3A7573]/20 data-[state=open]:bg-[#3A7573]/20">Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#1C4645] border border-[#3A7573]/30 p-4">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-[#3A7573]/20 hover:text-white focus:bg-[#3A7573]/20 focus:text-white")}>
                  <Link to="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side user controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-[#B0C4C3] hover:text-white hover:bg-[#3A7573]/20"
              >
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="bg-[#1C4645] border-[#3A7573]/30 text-white"
            >
              <DropdownMenuLabel className="text-[#B0C4C3]">Language</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3A7573]/30" />
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={cn(
                    "cursor-pointer hover:bg-[#3A7573]/20 focus:bg-[#3A7573]/20",
                    selectedLanguage === lang.code && "bg-[#3A7573]/30"
                  )}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile & Sign Out */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full hover:bg-[#3A7573]/20"
              >
                <Avatar className="h-8 w-8 border border-[#3A7573]/30">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-[#3A7573] to-[#5cdbd6] text-white">
                    {user?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-[#1C4645] border-[#3A7573]/30 text-white"
            >
              <DropdownMenuLabel className="text-[#B0C4C3]">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs leading-none text-[#B0C4C3]">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#3A7573]/30" />
              <DropdownMenuItem 
                asChild
                className="cursor-pointer hover:bg-[#3A7573]/20 focus:bg-[#3A7573]/20"
              >
                <Link to="/dashboard/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3A7573]/30" />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="cursor-pointer hover:bg-[#3A7573]/20 focus:bg-[#3A7573]/20 text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  )
}

function ListItem({
  title,
  children,
  href,
  className,
  ...props
}) {
  return (
    <li className={className} {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#3A7573]/20 hover:text-white focus:bg-[#3A7573]/20 focus:text-white text-[#B0C4C3]"
          )}
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-[#B0C4C3]/80">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
