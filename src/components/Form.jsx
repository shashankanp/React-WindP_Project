import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Container,
  Input,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Windmill from "../animations/windmill.json";

import { Player } from "@lottiefiles/react-lottie-player";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [service, setService] = React.useState("");

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={1}
      height="95vh"
      width="70vw"
      mx="auto"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          width: "80%",
          height: "80%",
        }}
      >
        <Typography variant="h5" pb={2}>
          Please enter your Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            {errors.name?.message && (
              <Typography variant="body1" sx={{ color: "red" }}>
                {errors.name?.message}
              </Typography>
            )}
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              placeholder="John Doe"
              {...register(
                "name",
                {
                  required: "Name is Required",
                  maxLength: 20,
                },
                { pattern: /^[A-Za-z\s]+$/i }
              )}
            />
            {errors.email?.message && (
              <Typography variant="body1" sx={{ color: "red" }}>
                {errors.email?.message}
              </Typography>
            )}
            <TextField
              id="email"
              label="Email Id"
              variant="outlined"
              placeholder="john@gmail.com"
              {...register(
                "email",
                {
                  required: " Email ID is Required",
                  maxLength: 35,
                },
                { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i }
              )}
            />
            {errors.no_turbines?.message && (
              <Typography variant="body1" sx={{ color: "red" }}>
                {errors.no_turbines?.message}
              </Typography>
            )}
            <TextField
              id="no_turbine"
              label="Number of Turbines"
              variant="outlined"
              placeholder="Ex: 100"
              {...register(
                "no_turbines",
                {
                  required: "A Number is Required",
                  maxLength: 5,
                  minLenght: 1,
                },
                { pattern: /^\d+$/ }
              )}
            />
            {errors.project_name?.message && (
              <Typography variant="body1" sx={{ color: "red" }}>
                {errors.project_name?.message}
              </Typography>
            )}
            <TextField
              id="project_name"
              label="Project Name"
              variant="outlined"
              placeholder="Ex: Turbine Tickle Fields,Whimsy Winds "
              {...register(
                "project_name",
                {
                  required: "Project Name is Required",
                  maxLength: 30,
                },
                { pattern: /^[A-Za-z0-9\s]+$/i }
              )}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                {errors.service?.message && (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    {errors.service?.message}
                  </Typography>
                )}
                <InputLabel id="service">Service Type</InputLabel>
                <Select
                  labelId="service"
                  id="service"
                  value={service}
                  label="Service Type"
                  onChange={handleChange}
                  {...register("service", {
                    required: "Service Type is Required",
                  })}
                >
                  <MenuItem value={"Site Prospecting"}>
                    Site Prospecting
                  </MenuItem>
                  <MenuItem value={" Wind Measurements"}>
                    Wind Measurements
                  </MenuItem>
                  <MenuItem value={"Energy Production Assessments"}>
                    Energy Production Assessments
                  </MenuItem>
                  <MenuItem value={"Design and Development Services"}>
                    Design and Development Services
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button variant="contained" type="submit">
              <Typography variant="body1">Submit</Typography>
            </Button>
          </Stack>
        </form>
      </Box>
      <Box
        sx={{
          width: "80%",
          height: "80%",
          backgroundColor: "primary.main",
        }}
      >
        <Player
          src={Windmill}
          className="player"
          loop
          autoplay
          speed={2}
          style={{ alignItems: "center", justifyContent: "center" }}
        />{" "}
      </Box>
    </Stack>
  );
};

export default Form;
