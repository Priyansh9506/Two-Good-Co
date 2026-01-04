import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Signup = () => {
    const stringRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
        contact: '',
        address: ''
    });

    useEffect(() => {
        // String Animation - wait for ref to be available
        if (!stringRef.current) return;

        const pathRef = stringRef.current.querySelector("path");
        if (!pathRef) return;

        const finalPath = "M 50 100 Q 768 100 1486 100";

        const handleMouseMove = (dets) => {
            const rect = stringRef.current.getBoundingClientRect();
            const relativeY = dets.clientY - rect.top;
            const relativeX = dets.clientX - rect.left;
            const path = `M 50 100 Q ${relativeX} ${relativeY} 1486 100`;

            gsap.to(pathRef, {
                attr: { d: path },
                ease: "power3.out",
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(pathRef, {
                attr: { d: finalPath },
                duration: 0.5,
                ease: "elastic.out(1,0.2)",
            });
        };

        const stringEl = stringRef.current;
        stringEl.addEventListener("mousemove", handleMouseMove);
        stringEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            stringEl.removeEventListener("mousemove", handleMouseMove);
            stringEl.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, confirmedPassword, contact, address } = formData;

        if (!name || !email || !password || !contact || !address || !confirmedPassword) {
            alert('All fields are required!');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmedPassword) {
            alert('Something went Wrong with Password');
            return;
        }

        if (isNaN(contact) || contact.length !== 10) {
            alert('Please Enter A valid Contact Number');
            return;
        }

        alert('Registration Successful');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name :</label>
                <input type="text" name="name" id="name" placeholder="Enter Name" onChange={handleChange} />

                <label htmlFor="email">Email Address :</label>
                <input type="text" name="email" id="email" placeholder="Enter Email Address" onChange={handleChange} />

                <label htmlFor="password">Password :</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" onChange={handleChange} />

                <label htmlFor="c_password">Confirm Password :</label>
                <input type="password" name="confirmedPassword" id="c_password" placeholder="Confirm Password" onChange={handleChange} />

                <label htmlFor="contact">Contact Number :</label>
                <input type="number" name="contact" id="contact" placeholder="Enter Contact Number" onChange={handleChange} />

                <label htmlFor="address">Address :</label>
                <textarea name="address" id="address" cols="30" rows="4" placeholder="Enter Address" onChange={handleChange}></textarea>

                <button type="submit">Submit</button>
            </form>
            <div id="string" ref={stringRef}>
                <svg width="1536" height="200" style={{ width: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div>
        </>
    );
}

export default Signup;
