import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

export default function InputField({
  labelFor,
  labelText,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
  helperText,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <FormControl isRequired>
      <FormLabel htmlFor={labelFor}>{labelText}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          id={id}
          type={showPassword ? "text" : type}
          name={name}
          _placeholder={{ color: "gray.500" }}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
              {showPassword ? "HIDE" : "SHOW"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
