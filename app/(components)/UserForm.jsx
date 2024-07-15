"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        
        try {
            const response = await fetch("/api/Users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData })
            });

            if (response.ok) {
                const responseData = await response.json();
                setErrorMessage(responseData.message);
                router.push("/");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Something went wrong");
            }
        } catch (error) {
            setErrorMessage("An error occurred while submitting the form");
        }
    }

    return (
        <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2 mx-auto">
            <h1 className="text-2xl font-bold">Create User</h1>
            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                value={formData.name}
                className="m-2 bg-slate-400 rounded"
            />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                value={formData.email}
                className="m-2 bg-slate-400 rounded"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                value={formData.password}
                className="m-2 bg-slate-400 rounded"
            />
            <button type="submit" className="bg-slate-400 rounded p-2">Create User</button>
            
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
    );
};

export default UserForm;
