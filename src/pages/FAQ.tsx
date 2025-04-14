
import { HelpCircle, BookOpen, Clock, User, Lock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const FAQ = () => {
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: <BookOpen className="h-5 w-5" />,
      questions: [
        {
          question: "What is Bookworm?",
          answer:
            "Bookworm is a comprehensive library management system that helps libraries organize their collections and enables readers to discover and borrow books easily.",
        },
        {
          question: "Do I need to create an account to use Bookworm?",
          answer:
            "Yes, you need to create an account to borrow books and access personalized features. However, you can browse the book catalog without logging in.",
        },
        {
          question: "Is Bookworm available on mobile devices?",
          answer:
            "Yes, Bookworm is fully responsive and works on all devices including smartphones and tablets. We also have dedicated mobile apps for iOS and Android.",
        },
      ],
    },
    {
      id: "borrowing",
      title: "Borrowing & Returns",
      icon: <Clock className="h-5 w-5" />,
      questions: [
        {
          question: "How long can I borrow a book for?",
          answer:
            "The standard borrowing period is 14 days. You may be able to renew your borrowing if no other user has requested the book.",
        },
        {
          question: "How many books can I borrow at once?",
          answer:
            "Regular users can borrow up to 5 books simultaneously. Premium members can borrow up to 10 books.",
        },
        {
          question: "What happens if I return a book late?",
          answer:
            "Late returns may incur fees as determined by your library's policy. You may also have borrowing restrictions until outstanding books are returned.",
        },
        {
          question: "How do I return a book?",
          answer:
            "Physical books must be returned to the library in person. E-books are automatically returned at the end of the borrowing period, or you can return them early through your account.",
        },
      ],
    },
    {
      id: "account",
      title: "Account Management",
      icon: <User className="h-5 w-5" />,
      questions: [
        {
          question: "How do I reset my password?",
          answer:
            "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
        },
        {
          question: "Can I update my personal information?",
          answer:
            "Yes, you can update your personal information by navigating to your profile page after logging in.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "To delete your account, please contact your library administrator. Note that you must return all borrowed books before your account can be deleted.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: <Lock className="h-5 w-5" />,
      questions: [
        {
          question: "How is my personal information protected?",
          answer:
            "Bookworm employs industry-standard security measures to protect your data. All personal information is encrypted and stored securely. We never share your information with third parties without your consent.",
        },
        {
          question: "Does Bookworm track my reading habits?",
          answer:
            "Bookworm collects data on borrowed books to improve our recommendations and service. You can adjust your privacy settings in your account to limit this data collection.",
        },
        {
          question: "Can I opt out of emails from Bookworm?",
          answer:
            "Yes, you can manage your email preferences in your account settings or unsubscribe directly from any email we send.",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-bookworm-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about using Bookworm
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category) => (
              <div key={category.id} className="rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-bookworm-500">{category.icon}</div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>
                <Separator className="mb-4" />
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              If you couldn't find the answer you were looking for, please contact us
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:support@bookworm-library.com"
                className="inline-flex items-center justify-center rounded-md bg-bookworm-500 px-4 py-2 text-sm font-medium text-white hover:bg-bookworm-600"
              >
                Email Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
