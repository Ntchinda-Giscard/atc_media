// components/OtpVerification.jsx
"use client";

import { useState } from "react";
import { PinInput, Group, Button, Box, Text } from "@mantine/core"; 
import axios from 'axios'         // UI components
// import axiosClient from "../lib/axiosClient";   
//@ts-ignore
import Cookies from 'js-cookie'                             // shared Axios instance

export default function OtpVerification() {
  const [otp, setOtp] = useState("");                                         // capture OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get('auth_token');

  const handleVerify = async () => {
    console.log("OTP", otp)

    setLoading(true);
    setError("");
    const data = {
        "pin": otp
    }
    try {
      const res = await axios.post("http://ec2-54-147-13-74.compute-1.amazonaws.com/api/v1/auth/verify-otp", data,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });  // send OTP to API
      
    } catch (err) {
        //@ts-ignore
      setError(err?.response?.data?.message || "Verification failed");         // show API error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maw={360} mx="auto" mt="xl">
      <Text size="sm" mb="xs">Enter the 6‑digit code sent to your email</Text>
      <Group justify="center" mb="md">
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
        <Text c="red" size="xs"  mb="sm">
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
