app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SUKOONVAULT API is healthy",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`SUKOONVAULT server running on port ${PORT}`);
});