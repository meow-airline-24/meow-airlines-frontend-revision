"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Group,
  Image,
  Input,
  InputAddon,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { LuUser, LuMail, LuPhone } from "react-icons/lu";

export default function CommunicationForm() {
  const [countryCode, setCountryCode] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <Flex
        minW={1080}
        width={"vw"}
        marginTop={2}
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
          paddingBottom={8}
          shadow={"0px 0px 8px -4px var(--shadow-color)"}
          shadowColor={"black"}
        >
          <VStack>
            <HStack gap={8}>
              <Image src={"../meowairline-logo.png"} height={32} />
              <Heading fontSize={"2xl"} color={"colorPalette.700"}>
                Please provide information for communication
              </Heading>
            </HStack>
            <HStack
              as={"form"}
              id={"communication-form"}
              gap={6}
              width={"100%"}
              align="baseline"
            >
              <VStack width={"100%"}>
                <Text width={"100%"} borderBottomWidth={1} textAlign={"center"}>
                  Contact Information
                </Text>
                <HStack width={"100%"} align={"baseline"} gap={6}>
                    <VStack width={"50%"}>
                        <Field
                        label={"Full name"}
                        >
                            <InputGroup width={"inherit"} startElement={<LuUser />}>
                                <Input
                                type={"text"}
                                id={"username"}
                                placeholder={"Your name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                ></Input>
                            </InputGroup>
                        </Field>
                        <Field
                        label={"Email address"}
                        >
                            <InputGroup width={"inherit"} startElement={<LuMail />}>
                                <Input
                                type={"email"}
                                id={"email-address"}
                                placeholder={"example@email.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                            </InputGroup>
                        </Field>
                    </VStack>

                  <VStack width={"50%"}>
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
                          id={"phone-number"}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        ></Input>
                      </Group>
                    </Field>
                  </VStack>
                </HStack>
              </VStack>
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
