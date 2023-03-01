import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">About FlowX</h2>
      <div className="p-4 text-justify text-lg">
        <p className="text-gray-300 leading-7 mb-4">
          FlowX is a decentralized photo storage and sharing app built on the
          Onflow blockchain. With FlowX, you can securely store your photos on
          the blockchain and share them with your friends and family.
        </p>
        <p className="text-gray-300 leading-7 mb-4">
          To get started with FlowX, simply sign up for an account on the FlowX
          website and connect your Flow wallet. Once you're logged in, you can
          upload your photos to the blockchain and share them with other users
          on the network.
        </p>
        <p className="text-gray-300 leading-7 mb-4">
          We're excited to bring the power of blockchain to photo storage and
          sharing, and we hope you'll join us on this journey!
        </p>
      </div>
    </div>
  );
};

export default About;
