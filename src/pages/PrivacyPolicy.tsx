
import { Shield, Lock, Database, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  const lastUpdated = "April 10, 2025";

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 text-bookworm-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">1. Introduction</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                At Bookworm, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our library management system, including our website, mobile application, and all related services (collectively, the "Service").
              </p>
              <p className="text-muted-foreground">
                Please read this Privacy Policy carefully. By using the Service, you consent to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              </div>
              <h3 className="text-lg font-bold mt-6 mb-3">2.1 Personal Information</h3>
              <p className="text-muted-foreground mb-4">
                We may collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Account credentials (username and password)</li>
                <li>Library card number or membership ID</li>
                <li>Billing information when applicable</li>
                <li>Profile information, such as profile picture and reading preferences</li>
              </ul>

              <h3 className="text-lg font-bold mt-6 mb-3">2.2 Usage Information</h3>
              <p className="text-muted-foreground mb-4">
                We automatically collect certain information about your device and how you interact with the Service, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Books you browse, borrow, or review</li>
                <li>Search terms and filters you use</li>
                <li>Date, time, and duration of your visits</li>
                <li>Pages you view</li>
                <li>Device information, including IP address, browser type, and operating system</li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Providing, maintaining, and improving the Service</li>
                <li>Processing borrowing requests and managing your account</li>
                <li>Sending notifications about due dates, available books, and account activity</li>
                <li>Personalizing your experience and providing book recommendations</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Conducting research and analytics to better understand and improve the Service</li>
                <li>Protecting the security and integrity of the Service</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">4. Data Security</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. Please notify us immediately of any unauthorized access or use of your account.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">5. Your Rights and Choices</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Restricting or objecting to our processing of your personal information</li>
                <li>Receiving a copy of your personal information in a structured, machine-readable format</li>
                <li>Withdrawing consent where our processing is based on your consent</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">6. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website and updating the "Last Updated" date.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service after the updated Privacy Policy has been posted constitutes your acceptance of the changes.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">7. Contact Us</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><strong>Email:</strong> privacy@bookworm-library.com</li>
                <li><strong>Address:</strong> 123 Library Street, Bookville, BK 12345</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="font-medium mb-2">By using Bookworm, you acknowledge that you have read and understood this Privacy Policy.</p>
            <p className="text-sm text-muted-foreground">If you do not agree with our policies and practices, please do not use our Service.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
