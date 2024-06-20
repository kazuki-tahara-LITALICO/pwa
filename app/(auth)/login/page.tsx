import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  return (
    <div className="w-screen pt-8 pb-7 px-4">
      <div className="space-y-2">
        <h1 className="text-2xl text-left font-normal">アカウントアカウント</h1>
        <Label
          htmlFor="options"
          className="flex flex-row gap-2 text-sm items-end"
        >
          サンプル<span className="text-xs text-red-600">必須</span>
        </Label>
        <SelectComponent
          placeholder="選択してください"
          valueObjectArray={sampleValueObjectArray}
        />
      </div>
    </div>
  );
};

// ------------------------- Select ---------------------
const sampleValueObjectArray = [
  { value: "sample1", displayName: "Sample1" },
  { value: "sample2", displayName: "Sample2" },
  { value: "sample3", displayName: "Sample3" },
];

type SelectComponent = {
  placeholder?: string;
  valueObjectArray: { value: string; displayName: string }[];
};

const SelectComponent = ({
  placeholder,
  valueObjectArray,
}: SelectComponent) => {
  return (
    <Select>
      <SelectTrigger
        id="options"
        className="w-full border-black py-3 px-4 mt-2"
      >
        <SelectValue className="text-base" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {valueObjectArray.map(({ value, displayName }, i) => (
            <SelectItem key={i} value={value}>
              {displayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LoginPage;
