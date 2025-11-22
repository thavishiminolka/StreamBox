import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO, useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const { startSSOFlow } = useSSO();
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    code?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Invalid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 6) next.password = "Min 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  const startEmailRegistration = async () => {
    if (!isLoaded) return;
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      await signUp.create({ emailAddress: email.trim(), password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err: any) {
      setErrors({
        general: err?.errors?.[0]?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!isLoaded) return;
    if (!code.trim()) {
      setErrors({ code: "Code required" });
      return;
    }
    setVerifying(true);
    setErrors({});
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });
      if (result.status === "complete" && setActive) {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      setErrors({ general: err?.errors?.[0]?.message || "Invalid code" });
    } finally {
      setVerifying(false);
    }
  };

  const isVerify = step === "verify";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.brandSection, isVerify && styles.verifyBrandAdjust]}>
        <Text style={styles.appName}>STREAMBOX</Text>
        <Text style={styles.tagline}>
          {isVerify
            ? "Enter verification code."
            : "Create your account to begin."}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={[styles.illustrationContainer, { marginBottom: 24 }]}>
            <Image
              source={require("../../assets/images/image1.png")}
              style={[
                styles.illustration,
                { width: 180, height: 180, maxHeight: 180 },
              ]}
              resizeMode="cover"
            />
          </View>
          <View style={styles.loginSection}>
            {isVerify ? (
              <View style={styles.formContainer}>
                <Text style={styles.inputLabel}>Verification Code</Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  placeholderTextColor={COLORS.grey}
                  style={[styles.input, styles.codeInput]}
                  keyboardType="number-pad"
                  maxLength={6}
                  returnKeyType="done"
                />
                {errors.code && (
                  <Text style={styles.errorText}>{errors.code}</Text>
                )}
                {errors.general && (
                  <Text style={styles.errorText}>{errors.general}</Text>
                )}
                <TouchableOpacity
                  onPress={verifyCode}
                  disabled={verifying}
                  style={[
                    styles.primaryButton,
                    verifying && styles.primaryButtonDisabled,
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>
                    {verifying ? "Verifying..." : "Confirm Account"}
                  </Text>
                </TouchableOpacity>
                <View style={styles.linkRow}>
                  <Text style={styles.termsText}>Need to edit email?</Text>
                  <TouchableOpacity onPress={() => setStep("form")}>
                    <Text style={styles.linkText}>Go Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.formContainer}>
                <View>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.grey}
                    style={styles.input}
                    returnKeyType="next"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••"
                    placeholderTextColor={COLORS.grey}
                    style={styles.input}
                    returnKeyType="done"
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                {errors.general && (
                  <Text style={styles.errorText}>{errors.general}</Text>
                )}
                <TouchableOpacity
                  onPress={startEmailRegistration}
                  disabled={loading}
                  style={[
                    styles.primaryButton,
                    loading && styles.primaryButtonDisabled,
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>
                    {loading ? "Sending code..." : "Register"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.dividerText}>or</Text>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.9}
            >
              <View style={styles.googleIconContainer}>
                <Ionicons name="logo-google" size={20} color="#1A1A1A" />
              </View>
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            {!isVerify && (
              <View style={styles.linkRow}>
                <Text style={styles.termsText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
