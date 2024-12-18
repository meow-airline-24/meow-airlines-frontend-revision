"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Group,
  Link,
  Image,
  Input,
  InputAddon,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { LuUser, LuLock, LuMail, LuPhone } from "react-icons/lu";
import { LiaIdCard } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { register } from "@/utils/backend";

export default function RegisterForm() {
  const errorTexts = {
    noError: "",
    missingValue: "This field is required",
    invalidMail: "This email is invalid",
    passwordShort: "Password must have at least 8 characters",
  };
  const [countryCode, setCountryCode] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState<boolean | null>(null);
  const [dob, setDob] = useState<Date | null>(null);
  const [phone, setPhone] = useState("");
  const [idType, setIdType] = useState<"nin" | "passport" | null>(null); // State for ID type
  const [idNumber, setIdNumber] = useState<string>(""); // State for ID number
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // console.log(countryCode[0]);
    if (
      !dob ||
      gender == null ||
      !idType ||
      !countryCode[0] ||
      !name ||
      !email ||
      !password ||
      !idNumber
    ) {
      setError("Please fill in all fields");
      return;
    }

    const user = {
      name,
      email,
      gender,
      dob,
      id_type: idType,
      id_number: idNumber,
      country_code: parseInt(countryCode[0], 10),
      phone,
    };

    try {
      console.log(user);
      await register(
        {
          ...user,
          role: "customer",
        },
        password
      );
      alert("Registration successful, heading to login page!");
      setError(null);
      router.push("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Flex
        minW={1080}
        width={"vw"}
        marginTop={"80px"}
        align={"center"}
        justify={"center"}
      >
        <Box
          bg={"white"}
          width={964}
          minW={964}
          borderRadius={8}
          paddingLeft={8}
          paddingRight={8}
          paddingBottom={3}
          shadow={"0px 0px 8px -4px var(--shadow-color)"}
          shadowColor={"black"}
        >
          <VStack>
            <HStack gap={8}>
              <Image src={"../meowairline-logo.png"} height={32} />
              <Heading fontSize={"2xl"} color={"colorPalette.700"}>
                Register for Meow Airlines
              </Heading>
            </HStack>
            <HStack
              as={"form"}
              id={"register-form"}
              gap={6}
              width={"100%"}
              align="baseline"
            >
              <VStack width={"33%"}>
                <Text width={"100%"} borderBottomWidth={1} textAlign={"center"}>
                  Account details
                </Text>
                {/* 
                                    Change errorText based on error 
                                    invalid property makes the outline red    
                                */}
                <Field
                  label={"Full name"}
                  invalid={false}
                  errorText={errorTexts.noError}
                >
                  <InputGroup width={"inherit"} startElement={<LuUser />}>
                    <Input
                      type={"text"}
                      placeholder={"Your name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Input>
                  </InputGroup>
                </Field>
                <Field
                  label={"Email address"}
                  invalid={false}
                  errorText={errorTexts.noError}
                >
                  <InputGroup width={"inherit"} startElement={<LuMail />}>
                    <Input
                      type={"email"}
                      placeholder={"example@email.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                  </InputGroup>
                </Field>
                <Field
                  label={"Password"}
                  invalid={false}
                  errorText={errorTexts.noError}
                >
                  {/* password length in range(8, 32) */}
                  <InputGroup width={"inherit"} startElement={<LuLock />}>
                    <PasswordInput
                      placeholder={"Your password"}
                      maxLength={32}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></PasswordInput>
                  </InputGroup>
                </Field>
                <Field
                  label={"Confirm password"}
                  invalid={false}
                  errorText={errorTexts.noError}
                >
                  {/* password length in range(8, 32) */}
                  <InputGroup width={"inherit"} startElement={<LuLock />}>
                    <PasswordInput
                      placeholder={"Confirm password"}
                      maxLength={32}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></PasswordInput>
                  </InputGroup>
                </Field>
              </VStack>

              <VStack width={"69%"}>
                <Text width={"100%"} borderBottomWidth={1} textAlign={"center"}>
                  User Information
                </Text>
                <HStack width={"100%"} align={"baseline"} gap={6}>
                  <VStack width={"50%"}>
                    {/* 
                                            Change errorText based on error 
                                            invalid property makes the outline red    
                                        */}
                    <Field label={"Gender"}>
                      <RadioGroup
                        value={gender === null ? undefined : gender.toString()}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setGender(e.target.value == "true");
                        }}
                        aria-required
                        asChild
                      >
                        <HStack
                          gap={6}
                          position={"relative"}
                          left={12}
                          marginTop={2}
                        >
                          <Radio value="true">Male</Radio>
                          <Radio value="false">Female</Radio>
                        </HStack>
                      </RadioGroup>
                    </Field>

                    <Field label={"Date of birth"} marginTop={3}>
                      <Input
                        width={"inherit"}
                        type={"date"}
                        value={dob ? dob.toISOString().split("T")[0] : ""}
                        onChange={(e) => setDob(new Date(e.target.value))}
                      ></Input>
                    </Field>

                    <SelectRoot
                      collection={countries}
                      onValueChange={(e) => setCountryCode(e.value)}
                    >
                      <SelectLabel>Country of origin</SelectLabel>
                      <SelectTrigger clearable>
                        <SelectValueText placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.items.map((country) => (
                          <SelectItem item={country} key={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>

                    <Field
                      label={"Phone"}
                      invalid={false}
                      errorText={errorTexts.noError}
                    >
                      <Group width={"inherit"} gap={0}>
                        <InputAddon>
                          {countryCode.length === 0 ? (
                            <LuPhone />
                          ) : (
                            <>{countryCode}</>
                          )}
                        </InputAddon>
                        <Input
                          placeholder={"Phone number"}
                          type={"tel"}
                          pattern={"[0-9]{12}"}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        ></Input>
                      </Group>
                    </Field>
                    {/* error field from request */}
                    {error && (
                      <Text color="red.500" fontSize="sm" marginBottom={4}>
                        {error}
                      </Text>
                    )}
                    <Button
                      width={"100%"}
                      marginTop={6}
                      formNoValidate
                      paddingTop={5}
                      paddingBottom={5}
                      fontSize={"lg"}
                      borderColor={"colorPalette.600"}
                      borderWidth={2}
                      _hover={{
                        bg: "colorPalette.400",
                        borderColor: "colorPalette.500",
                      }}
                      onClick={handleSignUp}
                    >
                      Sign up
                    </Button>
                  </VStack>

                  <VStack width={"50%"}>
                    <Field label={"Identification Method"}>
                      <RadioGroup
                        value={idType || undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setIdType(e.target.value as "nin" | "passport");
                        }}
                        asChild
                      >
                        <HStack
                          gap={6}
                          position={"relative"}
                          left={6}
                          marginTop={2}
                        >
                          <Radio value="nin">National ID</Radio>
                          <Radio value="passport">Passport ID</Radio>
                        </HStack>
                      </RadioGroup>
                    </Field>
                    <Field
                      label={"Identification Number"}
                      marginTop={3}
                      invalid={false}
                      errorText={errorTexts.noError}
                    >
                      <InputGroup
                        width={"inherit"}
                        startElement={<LiaIdCard />}
                      >
                        <Input
                          type={"text"}
                          placeholder={"Id"}
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </Field>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
            <HStack fontSize={"sm"} marginTop={2}>
              <Text>Already have an account?</Text>
              <Link href={"/login"}>Login</Link>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}

const countries = createListCollection({
  items: [
    { label: "Australia", value: "+61" },
    { label: "Belarus", value: "+375" },
    { label: "Belgium", value: "+32" },
    { label: "Brazil", value: "+55" },
    { label: "Cambodia", value: "+855" },
    { label: "China", value: "+86" },
    { label: "Czech Republic", value: "+420" },
    { label: "Denmark", value: "+45" },
    { label: "Egypt", value: "+20" },
    { label: "Finland", value: "+358" },
    { label: "France", value: "+33" },
    { label: "Germany", value: "+49" },
    { label: "Greece", value: "+30" },
    { label: "Hungary", value: "+36" },
    { label: "India", value: "+91" },
    { label: "Indonesia", value: "+62" },
    { label: "Iran", value: "+98" },
    { label: "Iraq", value: "+964" },
    { label: "Israel", value: "+972" },
    { label: "Italy", value: "+39" },
    { label: "Japan", value: "+81" },
    { label: "Kyrgyzstan", value: "+996" },
    { label: "Laos", value: "+856" },
    { label: "Lithuania", value: "+370" },
    { label: "Malaysia", value: "+60" },
    { label: "Mongolia", value: "+976" },
    { label: "Myanmar", value: "+95" },
    { label: "Nepal", value: "+977" },
    { label: "Netherlands", value: "+31" },
    { label: "New Zealand", value: "+64" },
    { label: "Norway", value: "+47" },
    { label: "Pakistan", value: "+92" },
    { label: "Philippines", value: "+63" },
    { label: "Poland", value: "+48" },
    { label: "Portugal", value: "+351" },
    { label: "Qatar", value: "+974" },
    { label: "Republic of the Congo", value: "+242" },
    { label: "Russia", value: "+7" },
    { label: "Saudi Arabia", value: "+966" },
    { label: "Singapore", value: "+65" },
    { label: "South Korea", value: "+82" },
    { label: "Spain", value: "+34" },
    { label: "Sweden", value: "+46" },
    { label: "Switzerland", value: "+41" },
    { label: "Thailand", value: "+66" },
    { label: "Turkey", value: "+90" },
    { label: "Ukraine", value: "+380" },
    { label: "United Kingdom", value: "+44" },
    { label: "United States", value: "+1" },
    { label: "Vietnam", value: "+84" },
    { label: "Yemen", value: "+967" },
  ],
});
