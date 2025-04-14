
import { FileText, ScrollText, Shield, AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  const lastUpdated = "April 10, 2025";

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-bookworm-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">1. Introduction</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Welcome to Bookworm, a library management system. These Terms of Service govern your use of the Bookworm platform, including the website, mobile application, and all related services (collectively, the "Service").
              </p>
              <p className="text-muted-foreground mb-4">
                By using Bookworm, you agree to these Terms of Service. If you do not agree to these terms, you may not use the Service.
              </p>
              <p className="text-muted-foreground">
                Bookworm is a platform that connects libraries and readers. We provide tools for libraries to manage their collections and for readers to discover and borrow books.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">2. Account Registration and Security</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                To access certain features of the Service, you must register for an account. When you register, you agree to provide accurate and complete information and to keep this information up to date.
              </p>
              <p className="text-muted-foreground mb-4">
                You are responsible for maintaining the security of your account and password. Bookworm cannot and will not be liable for any loss or damage resulting from your failure to comply with this security obligation.
              </p>
              <p className="text-muted-foreground">
                You are responsible for all activities that occur under your account. You must notify Bookworm immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">3. Using the Service</h2>
              </div>
              <h3 className="text-lg font-bold mt-6 mb-3">3.1 Book Borrowing</h3>
              <p className="text-muted-foreground mb-4">
                Bookworm enables users to borrow books from participating libraries. By borrowing a book, you agree to return it by the due date and in the same condition it was borrowed.
              </p>
              <p className="text-muted-foreground mb-4">
                Late returns may incur fees as determined by your library's policy. Damaged or lost books may result in replacement fees.
              </p>

              <h3 className="text-lg font-bold mt-6 mb-3">3.2 Content Guidelines</h3>
              <p className="text-muted-foreground mb-4">
                You may have the ability to post reviews, comments, or other content on the Service. Any content you post must comply with our Content Guidelines, which prohibit:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Hate speech, harassment, or bullying</li>
                <li>Illegal or harmful content</li>
                <li>Spam or commercial solicitation</li>
                <li>Content that violates others' intellectual property rights</li>
              </ul>
              <p className="text-muted-foreground">
                Bookworm reserves the right to remove any content that violates these guidelines and to suspend or terminate accounts that repeatedly violate them.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, Bookworm and its affiliates, officers, employees, agents, partners, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">5. Changes to the Terms</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Bookworm reserves the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting the updated terms on our website and updating the "Last Updated" date.
              </p>
              <p className="text-muted-foreground">
                Your continued use of the Service after such changes constitutes your acceptance of the new Terms. If you do not agree to the changes, you must stop using the Service.
              </p>
            </section>

            <Separator className="my-8" />

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <ScrollText className="h-6 w-6 text-bookworm-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">6. Contact Information</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><strong>Email:</strong> legal@bookworm-library.com</li>
                <li><strong>Address:</strong> 123 Library Street, Bookville, BK 12345</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="font-medium mb-2">By using Bookworm, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</p>
            <p className="text-sm text-muted-foreground">If you have questions or concerns about these terms, please contact our support team before using the Service.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
