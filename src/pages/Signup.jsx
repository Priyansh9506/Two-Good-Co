import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Elastic string — supports BOTH mouse AND touch.
 */
function useElasticString(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const pathEl = el.querySelector("path");
        if (!pathEl) return;

        const finalPath = "M 50 100 Q 768 100 1486 100";

        const getCoords = (e) => {
            const rect = el.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };
        };

        const onMove = (e) => {
            const { x, y } = getCoords(e);
            gsap.to(pathEl, {
                attr: { d: `M 50 100 Q ${x} ${y} 1486 100` },
                ease: "power3.out",
                duration: 0.3,
            });
        };

        const onEnd = () => {
            gsap.to(pathEl, {
                attr: { d: finalPath },
                duration: 0.5,
                ease: "elastic.out(1,0.2)",
            });
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onEnd);
        el.addEventListener("touchmove", onMove, { passive: true });
        el.addEventListener("touchend", onEnd);

        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onEnd);
            el.removeEventListener("touchmove", onMove);
            el.removeEventListener("touchend", onEnd);
        };
    }, [ref]);
}

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

    useElasticString(stringRef);

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
            <form onSubmit={handleSubmit} style={{ marginTop: '70px' }}>
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
                <svg viewBox="0 0 1536 200" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <path d="M 50 100 Q 768 100 1486 100" stroke="black" fill="transparent" />
                </svg>
            </div>
        </>
    );
}

export default Signup;
