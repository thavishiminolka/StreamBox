import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStyles } from "@/styles/auth.styles";
import { useSSO, useSignUp } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const { startSSOFlow } = useSSO();
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const { colors } = useTheme();
  const styles = useAuthStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.background,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: colors.background }}
        >
          <View
            style={[styles.brandSection, isVerify && styles.verifyBrandAdjust]}
          >
            <Text style={styles.appName}>STREAMBOX</Text>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
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
              paddingBottom: 20,
            }}
          >
            <View>
              <View
                style={[styles.illustrationContainer, { marginBottom: 24 }]}
              >
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
                    <Text style={[styles.inputLabel, { color: colors.text }]}>
                      Verification Code
                    </Text>
                    <TextInput
                      value={code}
                      onChangeText={setCode}
                      placeholder="123456"
                      placeholderTextColor={colors.grey}
                      style={[
                        styles.input,
                        styles.codeInput,
                        {
                          backgroundColor: colors.cardBackground,
                          color: colors.text,
                        },
                      ]}
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
                      <Text
                        style={[
                          styles.termsText,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Need to edit email?
                      </Text>
                      <TouchableOpacity onPress={() => setStep("form")}>
                        <Text style={styles.linkText}>Go Back</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.formContainer}>
                    <View>
                      <Text style={[styles.inputLabel, { color: colors.text }]}>
                        Email
                      </Text>
                      <TextInput
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="you@example.com"
                        placeholderTextColor={colors.grey}
                        style={[
                          styles.input,
                          {
                            backgroundColor: colors.cardBackground,
                            color: colors.text,
                          },
                        ]}
                        returnKeyType="next"
                      />
                      {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={[styles.inputLabel, { color: colors.text }]}>
                        Password
                      </Text>
                      <View style={{ position: "relative" }}>
                        <TextInput
                          secureTextEntry={!showPassword}
                          value={password}
                          onChangeText={setPassword}
                          placeholder="••••••"
                          placeholderTextColor={colors.grey}
                          style={[
                            styles.input,
                            {
                              backgroundColor: colors.cardBackground,
                              color: colors.text,
                              paddingRight: 45,
                            },
                          ]}
                          returnKeyType="done"
                        />
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            right: 14,
                            top: 14,
                            padding: 4,
                          }}
                          activeOpacity={0.7}
                        >
                          <Feather
                            name={showPassword ? "eye-off" : "eye"}
                            size={18}
                            color={colors.grey}
                          />
                        </TouchableOpacity>
                      </View>
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
                <Text
                  style={[styles.dividerText, { color: colors.textSecondary }]}
                >
                  or
                </Text>
                <TouchableOpacity
                  style={[
                    styles.googleButton,
                    {
                      backgroundColor:
                        colors.surface === "#000000"
                          ? "#FFFFFF"
                          : colors.cardBackground,
                    },
                  ]}
                  onPress={handleGoogleSignIn}
                  activeOpacity={0.9}
                >
                  <View style={styles.googleIconContainer}>
                    <Feather
                      name="mail"
                      size={20}
                      color={
                        colors.surface === "#000000" ? "#1A1A1A" : colors.text
                      }
                    />
                  </View>
                  <Text
                    style={[
                      styles.googleButtonText,
                      {
                        color:
                          colors.surface === "#000000"
                            ? "#1A1A1A"
                            : colors.text,
                      },
                    ]}
                  >
                    Continue with Google
                  </Text>
                </TouchableOpacity>
                {!isVerify && (
                  <View style={styles.linkRow}>
                    <Text
                      style={[
                        styles.termsText,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(auth)/login")}
                    >
                      <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
