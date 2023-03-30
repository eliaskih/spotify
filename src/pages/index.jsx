import Layout from "@/components/Layout";
import React from "react";

export default function index() {
    return (
        <Layout>
            <div className="p-10">
                <h1 className="text-4xl font-bold">
                    Welcome to my spotify clone
                </h1>

                <div className="grid grid-cols-5"></div>
            </div>
        </Layout>
    );
}
