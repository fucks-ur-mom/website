// Factory page code with complete DNS record form
'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

type DnsRecordForm = {
  subdomain: string; // Add this property
  owner: {
    username: string;
    email: string;
  };
  record: {
    A?: string[];
    AAAA?: string[];
    CNAME?: string;
    MX?: string[];
    TXT?: string[];
    CAA?: Array<{ flags: number; tag: string; value: string }>;
    SRV?: Array<{ priority: number; weight: number; port: number; target: string }>;
  };
  proxied: boolean;
};

// In your form component, add a subdomain input field:
<FormField
  name="subdomain"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Subdomain</FormLabel>
      <Input 
        {...field}
        placeholder="your-desired-subdomain"
        required
      />
    </FormItem>
  )}
/>

export default function FactoryPage() {
  const form = useForm<DnsRecordForm>();

  const generateJson = (data: DnsRecordForm) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.subdomain}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Update instructions section
  <Card className="p-6">
    <h2 className="text-xl font-semibold mb-4">Submission Instructions</h2>
    <ol className="list-decimal list-inside space-y-2 pl-4">
      <li>Fork the <a href="https://github.com/fucks-ur-mom/register" className="text-primary hover:underline" target="_blank">GitHub repository</a></li>
      <li>Create new file in <code>/domains</code> folder named <code>[your-subdomain].json</code></li>
      <li>Copy generated JSON into the file</li>
      <li>Submit a pull request with descriptive title</li>
      <li>Wait for merge confirmation (typically within 24 hours)</li>
    </ol>
    <p className="mt-4 text-sm text-muted-foreground">
      Note: Your JSON file name must exactly match your desired subdomain
    </p>
  </Card>
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-6 mb-8">
            <h1 className="text-3xl font-bold mb-6">Domain Registration Factory</h1>
            
            <Form {...form}>
              {/* Form fields for all DNS record types */}
              <div className="space-y-6">
                {/* Owner Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Owner Details</h2>
                  <FormField
                    name="owner.username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Username</FormLabel>
                        <Input {...field} required />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="owner.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <Input {...field} type="email" required />
                      </FormItem>
                    )}
                  />
                </div>

                {/* DNS Records Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">DNS Configuration</h2>
                  
                  {/* A Records */}
                  <div className="space-y-2">
                    <h3 className="font-medium">A Records (IPv4)</h3>
                    <FormField
                      name="record.A"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IPv4 Addresses</FormLabel>
                          <Input
                            {...field}
                            placeholder="1.1.1.1, 1.0.0.1"
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* AAAA Records */}
                  <div className="space-y-2">
                    <h3 className="font-medium">AAAA Records (IPv6)</h3>
                    <FormField
                      name="record.AAAA"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IPv6 Addresses</FormLabel>
                          <Input
                            {...field}
                            placeholder="::1, ::2"
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* CNAME Record */}
                  <div className="space-y-2">
                    <h3 className="font-medium">CNAME Record</h3>
                    <FormField
                      name="record.CNAME"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Canonical Name</FormLabel>
                          <Input {...field} placeholder="example.com" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* MX Records */}
                  <div className="space-y-2">
                    <h3 className="font-medium">MX Records</h3>
                    <FormField
                      name="record.MX"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mail Servers</FormLabel>
                          <Input
                            {...field}
                            placeholder="mx1.example.com, mx2.example.com"
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* TXT Records */}
                  <div className="space-y-2">
                    <h3 className="font-medium">TXT Records</h3>
                    <FormField
                      name="record.TXT"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text Values</FormLabel>
                          <Input
                            {...field}
                            placeholder="example_verification=1234567890"
                            onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                          />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Proxied Setting - keep existing code but ensure Switch is imported */}
                  <FormField
                    name="proxied"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormLabel>Proxy Through Cloudflare:</FormLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Generate JSON File
                </Button>
              </div>
            </Form>
          </Card>

          {/* JSON Preview and Instructions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Submission Instructions</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Fork the GitHub repository</li>
              <li>Create new file in /domains folder</li>
              <li>Copy generated JSON into the file</li>
              <li>Submit a pull request</li>
            </ol>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}