"use client";

import { motion } from "framer-motion";
import { Server, Globe, Database, Github, Twitter, Globe2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      title: "A Records",
      description: "Map your subdomain to an IPv4 address for direct server connections",
      icon: Server,
    },
    {
      title: "CNAME Records",
      description: "Point your subdomain to another domain name for flexible routing",
      icon: Globe,
    },
    {
      title: "TXT Records",
      description: "Add text records for domain verification and security",
      icon: Database,
    },
  ];

  const steps = [
    {
      title: "1. Fork the Repository",
      description: "Start by forking our GitHub repository to your account",
    },
    {
      title: "2. Add Your Domain",
      description: "Create a new JSON file with your desired subdomain name",
    },
    {
      title: "3. Configure Records",
      description: "Add your DNS records and contact information",
    },
    {
      title: "4. Submit PR",
      description: "Create a pull request to register your subdomain",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              loves-ur.mom
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get your own personalized subdomain through our GitHub-based registration system
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="h-12">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
              <Button size="lg" variant="outline" className="h-12">
                <Globe2 className="mr-2 h-5 w-5" />
                Register Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <Card key={step.title} className="p-6">
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground flex-1">{step.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Supported DNS Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map(({ title, description, icon: Icon }) => (
                <Card key={title} className="p-6">
                  <div className="flex flex-col items-center text-center h-full">
                    <Icon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">Made by DevMatei</p>
            <div className="flex gap-6">
              <a
                href="https://devmatei.is-a.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Website
              </a>
              <a
                href="https://github.com/thedevmatei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/thedevmatei"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}