import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import img from "@/images/contact1.png";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="mx-3 my-10 md:mx-10 lg:mx-32">
      <header className="text-center">
        <h2 className="my-4 text-4xl font-bold lg:text-6xl">Contact With Me</h2>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <article className="white-bg dark:dark-bg col-span-1 rounded-lg p-4 md:col-span-5 md:p-6">
          <Image
            src={img}
            alt="Sejar Parvez"
            className="h-40 w-full rounded object-cover md:h-56"
          />

          <p className="mb-2 mt-4 text-3xl font-bold">Md. Mohon</p>

          <p className="mb-4 text-muted-foreground">
            Feel free to get in touch with me for any inquiries, feedback or
            assistance. I am dedicated to providing excellent service and are
            eager to hear from you.
          </p>
          <p>
            Address: Rofi Tower 4th Floor Paira Chattra, Jhenaidah, Dhaka,
            Bangladesh
          </p>
          <p>Phone: +8801989-491248</p>
          <p>Email: contact@freelancermohon.com</p>
        </article>

        <form className="dark:dark-bg col-span-1 flex flex-col rounded-lg bg-slate-50 p-4 md:col-span-7 md:p-6">
          {[
            { label: "Your Name", type: "text", id: "name" },
            { label: "Phone Number", type: "text", id: "phone" },
            { label: "Email", type: "email", id: "email" },
          ].map(({ label, type, id }) => (
            <div className="mb-4" key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} type={type} />
            </div>
          ))}
          <div className="mb-4">
            <Label
              htmlFor="message"
              className="text-sm font-semibold uppercase text-muted-foreground"
            >
              Your Message
            </Label>
            <Textarea id="message" className="h-40" />
          </div>
          <Button aria-label="send message" title="send message">
            SEND MESSAGE
          </Button>
        </form>
      </div>
    </div>
  );
}
