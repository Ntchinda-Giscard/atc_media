// components/OtpVerification.jsx
"use client";

import { useState } from "react";
import { PinInput, Group, Button, Box, Text } from "@mantine/core";          // UI components
import axiosClient from "../lib/axiosClient";                                // shared Axios instance

export default function OtpVerification({ email }) {
  const [otp, setOtp] = useState("");                                         // capture OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosClient.post("/auth/verify-otp", { email, otp });  // send OTP to API
      // handle success (e.g., redirect to reset-password page)
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");         // show API error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={360} mx="auto" mt="xl">
      <Text size="sm" mb="xs">Enter the 6‑digit code sent to your email</Text>
      <Group position="center" mb="md">
        <PinInput
          length={6}                     // six boxes :contentReference[oaicite:4]{index=4}
          type="number"                  // numeric only :contentReference[oaicite:5]{index=5}
          placeholder="–"
          oneTimeCode                    // enable SMS‑autocomplete on iOS/Android :contentReference[oaicite:6]{index=6}
          value={otp}
          onChange={setOtp}
          inputMode="numeric"
        />
      </Group>

      {error && (
        <Text color="red" size="xs" align="center" mb="sm">
          {error}
        </Text>
      )}

      <Button
        fullWidth
        onClick={handleVerify}
        loading={loading}
        disabled={otp.length < 6}
      >
        Verify OTP
      </Button>
    </Box>
  );
}
