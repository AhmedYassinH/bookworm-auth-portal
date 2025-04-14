
import { BookOpen, Users, Building, Medal, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Bookworm</h1>
            <p className="text-lg text-muted-foreground">
              Your friendly neighborhood library management system
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-8 w-8 text-bookworm-500" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                At Bookworm, we believe that access to knowledge should be simple and effortless. 
                Our mission is to create a seamless library experience that connects readers with 
                the books they love, while helping libraries manage their collections efficiently.
              </p>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Building className="h-8 w-8 text-bookworm-500" />
                <h2 className="text-2xl font-bold">Our Story</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Founded in 2023, Bookworm began as a small project with big ambitions. 
                Our team of book-loving developers and library science experts came together 
                with a shared vision: to modernize library management systems and make them 
                more accessible to both librarians and readers.
              </p>
              <p className="text-muted-foreground">
                What started as a simple catalog system has grown into a comprehensive 
                platform used by libraries across the country. Today, Bookworm helps 
                manage thousands of books and serves countless readers daily.
              </p>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-bookworm-500" />
                <h2 className="text-2xl font-bold">Our Team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Founder & CEO",
                    bio: "Former librarian with a passion for making knowledge accessible to all.",
                  },
                  {
                    name: "David Chen",
                    role: "CTO",
                    bio: "Software architect who believes in creating intuitive, powerful tools.",
                  },
                  {
                    name: "Maria Rodriguez",
                    role: "Head of Library Relations",
                    bio: "Works closely with libraries to understand their unique needs.",
                  },
                ].map((member, index) => (
                  <div key={index} className="bg-muted rounded-lg p-6 text-center">
                    <div className="w-20 h-20 bg-bookworm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-bookworm-500 text-2xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-bookworm-500 text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Medal className="h-8 w-8 text-bookworm-500" />
                <h2 className="text-2xl font-bold">Our Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Accessibility",
                    description: "We believe knowledge should be accessible to everyone.",
                  },
                  {
                    title: "Innovation",
                    description: "We constantly evolve our platform to meet changing needs.",
                  },
                  {
                    title: "Community",
                    description: "We value the communities that libraries serve.",
                  },
                  {
                    title: "Simplicity",
                    description: "We strive to make complex systems simple to use.",
                  },
                ].map((value, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-8 w-8 text-bookworm-500" />
                <h2 className="text-2xl font-bold">Key Milestones</h2>
              </div>
              <div className="space-y-4">
                {[
                  { year: 2023, event: "Bookworm is founded" },
                  { year: 2023, event: "First library partnership established" },
                  { year: 2024, event: "Mobile app launched" },
                  { year: 2024, event: "Reached 100,000 books managed" },
                  { year: 2025, event: "Expanded to international libraries" },
                ].map((milestone, index) => (
                  <div key={index} className="flex">
                    <div className="w-20 font-bold">{milestone.year}</div>
                    <div className="flex-1 pb-4 border-b">
                      <p>{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
