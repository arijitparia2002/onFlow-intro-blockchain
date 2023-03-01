import Head from "next/head";
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import { About, Header, Footer, PhotoGallery } from "@/components";

export default function Home() {
  const [user, setUser] = useState({ loggedIn: null });
  const [name, setName] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null); // NEW

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const sendQuery = async () => {
    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)],
    });

    setName(profile?.name ?? "No Profile");
  };

  const initAccount = async () => {
    const transactionId = await fcl.mutate({
      cadence: `
        import Profile from 0xProfile

        transaction {
          prepare(account: AuthAccount) {
            // Only initialize the account if it hasn't already been initialized
            if (!Profile.check(account.address)) {
              // This creates and stores the profile in the user's account
              account.save(<- Profile.new(), to: Profile.privatePath)

              // This creates the public capability that lets applications read the profile's info
              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
            }
          }
        }
      `,
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50,
    });

    const transaction = await fcl.tx(transactionId).onceSealed();
    console.log(transaction);
  };

  // NEW
  const executeTransaction = async () => {
    const transactionId = await fcl.mutate({
      cadence: `
        import Profile from 0xProfile

        transaction(name: String) {
          prepare(account: AuthAccount) {
            account
              .borrow<&Profile.Base{Profile.Owner}>(from: Profile.privatePath)!
              .setName(name)
          }
        }
      `,
      args: (arg, t) => [arg("robert downey jr", t.String)],
      payer: fcl.authz,
      proposer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 50,
    });

    fcl.tx(transactionId).subscribe((res) => setTransactionStatus(res.status));
  };

  const AuthedState = () => {
    return (
      <div className="">
        <div className="right-0 justify-end grid grid-flow-row mr-3">
          <div>Address: {user?.addr ?? "No Address"}</div>
          <div>Profile Name: {name ?? "--"}</div>
        </div>
        <div className="container justify-center">
          <div>Transaction Status: {transactionStatus ?? "--"}</div> {/* NEW */}
        </div>
        <div className="flex flex-row justify-center mt-8 mb-10">
          <button
            className=" px-3  py-2 bg-gray-600 hover:bg-slate-800 m-2 rounded-xl font-bold"
            onClick={sendQuery}
          >
            Send Query
          </button>
          <button
            className=" px-3 py-2 bg-gray-600 hover:bg-slate-800 m-2 rounded-xl font-bold"
            onClick={initAccount}
          >
            Init Account
          </button>
          <button
            className=" px-3 py-2 bg-gray-600 hover:bg-slate-800 m-2 rounded-xl font-bold"
            onClick={executeTransaction}
          >
            Execute Transaction
          </button>{" "}
          {/* NEW */}
          <button
            className=" px-3 py-2 bg-gray-600 hover:bg-slate-800 m-2 rounded-xl font-bold"
            onClick={fcl.unauthenticate}
          >
            Log Out
          </button>
        </div>
        <div>
          <PhotoGallery image={name}/>
        </div>
        <div>
          Enjoy the Photos
        </div>
      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <About />
        <div className="container flex items-center justify-center">
          <div>
            <button
              className="px-6 mx-3 py-3 rounded-xl text-white font-semibold bg-gray-400 hover:bg-gray-600"
              onClick={fcl.logIn}
            >
              Log In
            </button>
            <button
              className="px-5 py-3 mx-3 rounded-xl text-white font-semibold bg-gray-400 hover:bg-gray-600"
              onClick={fcl.signUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>FCL Quickstart with NextJS</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div class="relative">
        <Header />
        {user.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
        <Footer />
      </div>
    </div>
  );
}
