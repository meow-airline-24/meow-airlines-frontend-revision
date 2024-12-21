"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
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
import { LuUser } from "react-icons/lu";
import { LiaIdCard } from "react-icons/lia";

export default function PassengerForm(props: { formID : string }) {
  const { formID } = props
  const [name, setName] = useState("");
  const [gender, setGender] = useState<boolean | null>(null);
  const [dob, setDob] = useState<Date | null>(null);
  const [idType, setIdType] = useState<"nin" | "passport" | null>(null); // State for ID type
  const [idNumber, setIdNumber] = useState<string>(""); // State for ID number

  const FormID = 'passenger-form-' + formID

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
          paddingTop={8}
          paddingBottom={8}
          shadow={"0px 0px 8px -4px var(--shadow-color)"}
          shadowColor={"black"}
        >
            <HStack
              as={"form"}
              id={FormID}
              gap={6}
              width={"100%"}
              align="baseline"
            >
              <VStack width={"100%"}>
                <Text width={"100%"} borderBottomWidth={1} textAlign={"center"}>
                  Passenger Information
                </Text>
                <HStack width={"100%"} position={'relative'} align={"baseline"} gap={6}>
                  <VStack width={"33%"}>
                    <Field
                      label={"Full name"}
                    >
                      <InputGroup width={"inherit"} startElement={<LuUser />}>
                        <Input
                          type={"text"}
                          placeholder={"Your name"}
                          id={'username'}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </Field>

                    <Field label={"Gender"}>
                      <RadioGroup
                        value={gender === null ? undefined : gender.toString()}
                        name={'gender'}
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
                  </VStack>

                  <VStack width={"33%"}>
                    <Field label={"Date of birth"} marginTop={3}>
                      <Input
                        width={"inherit"}
                        type={"date"}
                        id={'date-of-birth'}
                        value={dob ? dob.toISOString().split("T")[0] : ""}
                        onChange={(e) => setDob(new Date(e.target.value))}
                      ></Input>
                    </Field>

                    <SelectRoot
                      collection={countries}
                      position={'relative'}
                      id={'country-code-' + formID}
                    >
                      <SelectLabel>Country of origin</SelectLabel>
                      <SelectTrigger clearable>
                        <SelectValueText placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent position={'relative'}>
                        {countries.items.map((country) => (
                          <SelectItem item={country} key={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  </VStack>

                  <VStack width={"33%"}>
                    <Field label={"Identification Method"}>
                      <RadioGroup
                        value={idType || undefined}
                        name={'id-type'}
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
                    >
                      <InputGroup
                        width={"inherit"}
                        startElement={<LiaIdCard />}
                      >
                        <Input
                          type={"text"}
                          placeholder={"Id"}
                          id={'identification-number'}
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </Field>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
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
