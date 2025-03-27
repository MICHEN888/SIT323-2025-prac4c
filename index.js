const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Function to validate input numbers
const validateNumbers = (num1, num2 = undefined) => {
    if (isNaN(num1) || (num2 !== undefined && isNaN(num2))) {
        return "Both inputs must be valid numbers.";
    }
    return null;
};

// Addition
app.get("/add", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    res.json({ result: Number(num1) + Number(num2) });
});

// Subtraction
app.get("/subtract", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    res.json({ result: Number(num1) - Number(num2) });
});

// Multiplication
app.get("/multiply", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    res.json({ result: Number(num1) * Number(num2) });
});

// Division
app.get("/divide", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    if (Number(num2) === 0) {
        return res.status(400).json({ error: "Division by zero is not allowed." });
    }

    res.json({ result: Number(num1) / Number(num2) });
});

// Exponentiation (num1 ^ num2)
app.get("/power", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    res.json({ result: Math.pow(Number(num1), Number(num2)) });
});

// Square Root
app.get("/sqrt", (req, res) => {
    const { num } = req.query;
    
    // Validate single input (instead of calling validateNumbers which expects 2 inputs)
    if (!num || isNaN(num)) {
        return res.status(400).json({ error: "Input must be a valid number." });
    }

    if (Number(num) < 0) {
        return res.status(400).json({ error: "Square root of negative numbers is not supported." });
    }

    res.json({ result: Math.sqrt(Number(num)) });
});

// Modulo (num1 % num2)
app.get("/modulo", (req, res) => {
    const { num1, num2 } = req.query;
    const error = validateNumbers(num1, num2);
    if (error) return res.status(400).json({ error });

    res.json({ result: Number(num1) % Number(num2) });
});

// Default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the enhanced calculator microservice!" });
});

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found." });
});

// Start server
app.listen(port, () => {
    console.log(`Calculator microservice running on http://localhost:${port}`);
});
