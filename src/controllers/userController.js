const express = require("express");
const { v4: uuid } = require('uuid');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


let users = [];


const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = { id: uuid(), username, email, password: hashedPassword };
        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, username: newUser.username }, 'secretkeyhbhai', { expiresIn: '1h' });
        
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User with this email does not exist' });
    }

    try {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'secretkeyhbhai', { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const logout = async (req, res) => {
    const userId = req.user.id;

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userIndex].token = '';

    res.json({ message: 'Logged out successfully' });
};

module.exports = {signUp, signIn , logout}