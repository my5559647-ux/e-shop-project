import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activation_token) {
      setError(true);
      setLoading(false);
      return;
    }

    const sendRequest = async () => {
      try {
        await axios.post(
          `${server}/user/activation`,
          { activation_token },
          { withCredentials: true, timeout: 120000 }
        );
        setLoading(false);
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    sendRequest();
  }, [activation_token, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {loading ? (
        <p>Activating your account...</p>
      ) : error ? (
        <>
          <p>Your token is expired or invalid!</p>
          <a href="/sign-up" style={{ color: "#2563eb" }}>
            Register again
          </a>
        </>
      ) : (
        <p>Your account has been created successfully! Redirecting...</p>
      )}
    </div>
  );
};

export default ActivationPage;
