"use client";

import { useState, useEffect } from "react";
import { Aircraft } from "@/interfaces/Aircraft";
import { Button, Input, Stack, Box, Select } from "@chakra-ui/react";
import { createAircraft, editAircraft } from "@/utils/backend";

type AircraftFieldsProps = {
  onSave: (aircraft: Aircraft) => void;
  onCancel: () => void;
  initialAircraft?: Aircraft;
  type?: "create" | "edit";
};

const AircraftFields = ({
  onSave,
  onCancel,
  initialAircraft,
  type,
}: AircraftFieldsProps) => {
  const [aircraft, setAircraft] = useState<Aircraft>({
    _id: "",
    model: "",
    manufacture_year: new Date().getFullYear(),
    status: "Active",
  });

  useEffect(() => {
    if (initialAircraft) {
      setAircraft({ ...initialAircraft });
    }
  }, [initialAircraft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAircraft((prev) => ({
      ...prev,
      [name]: name === "manufacture_year" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (type === "edit" && initialAircraft) {
        const updatedAircraft = await editAircraft(aircraft);
        onSave(updatedAircraft);
      } else {
        const createdAircraft = await createAircraft(aircraft);
        onSave(createdAircraft);
        alert("Aircraft created successfully! Please refresh the page.");
      }
    } catch (error) {
      console.error("Error saving aircraft:", error);
      alert("Error saving aircraft. Please try again.");
      window.location.reload();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Box p={6} boxShadow="lg" borderRadius="md" bg="white" maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          {/* Model */}
          <div>
            <label htmlFor="model">Model</label>
            <Input
              id="model"
              name="model"
              value={aircraft.model || ""}
              onChange={handleChange}
              placeholder="Enter aircraft model"
              required
            />
          </div>

          {/* Manufacture Year */}
          <div>
            <label htmlFor="manufacture_year">Manufacture Year</label>
            <Input
              id="manufacture_year"
              name="manufacture_year"
              type="number"
              value={aircraft.manufacture_year || ""}
              onChange={handleChange}
              placeholder="Enter manufacture year"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={aircraft.status || ""}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <Stack direction="row" gap={4}>
            <Button type="submit" colorScheme="teal" flex="1">
              {initialAircraft ? "Update Aircraft" : "Create Aircraft"}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              colorScheme="gray"
              flex="1"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AircraftFields;
