import React, { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div className="w-screen pt-8 pb-7 px-4">
      <h1 className="text-2xl text-left font-bold">アカウントアカウント</h1>
      <div className="space-y-5">
        <div className="mt-3">
          <FormLabel id="options">サンプル</FormLabel>
          <SelectComponent
            id={"options"}
            placeholder="選択してください"
            valueObjectArray={sampleValueObjectArray}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FormInput id="input1" labelName="サンプル" />
          <FormInput id="input2" labelName="サンプル2" />
        </div>
        <div className="flex flex-row gap-4">
          <FormInput id="input3" labelName="サ（サンプル）" />
          <FormInput id="input4" labelName="サ（サンプル2）" />
        </div>
        <FormInput id="input5" labelName="電ンプル" />
        <FormInput id="input6" labelName="メールサンプル" />
        <FormInput id="input6" labelName="パスワード" />
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
  id: string;
  placeholder?: string;
  valueObjectArray: { value: string; displayName: string }[];
};

const SelectComponent = ({
  id,
  placeholder,
  valueObjectArray,
}: SelectComponent) => {
  return (
    <Select>
      <SelectTrigger id={id} className="w-full border-black py-7 px-4 mt-2">
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

type FormLabel = {
  children: ReactNode;
  id: string;
  isMust?: boolean;
};

const FormLabel = ({ children, id, isMust = true }: FormLabel) => {
  return (
    <Label htmlFor={id} className="flex flex-row gap-2 text-sm items-end">
      {children}
      {isMust && <span className="text-xs text-red-600">必須</span>}
    </Label>
  );
};

type FormInputProps = {
  id: string;
  labelName: string;
  type?: string;
};

const FormInput = ({ id, labelName, type = "text" }: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <FormLabel id={id}>{labelName}</FormLabel>
      <Input type={type} id={id} className="h-14 mt-2" />
    </div>
  );
};

export default LoginPage;
