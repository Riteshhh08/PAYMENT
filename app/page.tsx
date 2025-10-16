import Image from "next/image";
import Link from "next/link";

import gateways from "@/data/gateways.json";
import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/combobox";
import { Field, Label } from "@/components/fieldset";

export default function Home() {
  return (
    <main className="flex py-16 com flex-col items-center justify-between container mx-auto">
      <div className="z-10 px-4 w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Souce code available at&nbsp;
          <Link
            className="hover:underline"
            href="https://github.com/Riteshhh08/PAYMENT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code className="font-mono font-bold">github.com</code>
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://github.com/Riteshhh08"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <span className="text-2xl tracking-tighter">RITESH VISHWAKARMA</span>
          </Link>
        </div>
      </div>

      <div className="relative mt-10 z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="profile-3d group relative w-44 h-44 md:w-48 md:h-48">
          {/* flat decorative layers (subtle) */}
          <div className="transform-flat hidden md:block absolute inset-0">
            <div className="layer bg-sky-300/20 rounded-full absolute" style={{ inset: 0 }}></div>
          </div>

          {/* the 3d layers that will animate on hover */}
          <div className="transform-3d absolute inset-0 pointer-events-none">
            <div className="layer layer-1" />
            <div className="layer layer-2" />
            <div className="layer layer-3" />
            <div className="layer layer-4" />
            <div className="layer layer-5" />
            <div className="layer layer-6" />
          </div>

          {/* the actual profile image centered */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              className="rounded-full object-cover w-full h-full"
              src="/images/profile.png"
              alt="profile"
              fill={false}
              width={180}
              height={180}
              priority
            />
          </div>

          {/* logo that appears after hover */}
          <div className="logo-overlay absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={64}
              height={64}
              className="opacity-0 transform translate-y-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
            />
          </div>
        </div>
      </div>

      <div className="mb-32 mt-20 px-4 grid text-center gap-4 lg:mb-0 w-full sm:grid-cols-2 lg:grid-cols-3  sm:text-left">
        <div className="col-span-full flex flex-col items-center gap-4 mb-6">
          <svg className="w-6 h-6 animate-bounce text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C9 5 3 7 3 12c0 5 4 7 9 10 5-3 9-5 9-10 0-5-6-7-9-10z" />
          </svg>

          <div className="flex gap-3">
            <button className="duration-300 ease-in rounded bg-slate-800 text-white px-4 py-2">Button A</button>
            <button className="duration-300 ease-out rounded bg-slate-700 text-white px-4 py-2">Button B</button>
            <button className="duration-300 ease-in-out rounded bg-slate-600 text-white px-4 py-2">Button C</button>
          </div>

          <div className="w-full max-w-sm">
            <Field>
              <Label>Assigned to</Label>
              <Combobox
                name="user"
                options={[{ name: "Ritesh" }, { name: "Alex" }, { name: "Jordan" }]}
                displayValue={(u: any) => u?.name}
                defaultValue={{ name: "Ritesh" }}
              >
                {(user: any) => (
                  <ComboboxOption value={user}>
                    <ComboboxLabel>{user.name}</ComboboxLabel>
                  </ComboboxOption>
                )}
              </Combobox>
            </Field>
          </div>
        </div>

        {gateways.map((gateway, index) => (
          <div
            key={index}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <div>
              <Link href={gateway.url}>
                <h2 className="mb-3 text-2xl font-semibold">
                  {gateway.name}&nbsp;
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
              </Link>
            </div>
            <p className="m-0  text-sm opacity-50">{gateway.description}</p>
            <Link href={gateway.website}></Link>
          </div>
        ))}
      </div>
    </main>
  );
}
