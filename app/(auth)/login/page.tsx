"use client";

import React, { ReactNode, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { type } from "os";

// サンプルデータ
const sampleValueObjectArray = [
  { value: "sample1", displayName: "Sample1" },
  { value: "sample2", displayName: "Sample2" },
  { value: "sample3", displayName: "Sample3" },
];

// メインページコンポーネント
const LoginPage = () => {
  return (
    <div className="w-screen pt-8 pb-7 px-4">
      <h1 className="text-2xl text-left font-bold">アカウントアカウント</h1>
      <div className="space-y-5 mt-3">
        <SelectField
          id="options"
          label="サンプル"
          placeholder="選択してください"
          valueObjectArray={sampleValueObjectArray}
        />
        <div className="flex flex-row gap-4">
          <FormInput id="input1" label="サンプル" />
          <FormInput id="input2" label="サンプル2" />
        </div>
        <div className="flex flex-row gap-4">
          <FormInput id="input3" label="サ（サンプル）" />
          <FormInput id="input4" label="サ（サンプル2）" />
        </div>
        <FormInput id="input5" label="サンプル" type="number" />
        <FormInput id="input6" label="メールサンプル" type="email" />
        <FormPasswordInput id="input7" label="パスワード">
          <span className="text-xs text-gray-400 mt-2">
            半角英数字 8~16文字
          </span>
        </FormPasswordInput>
      </div>
    </div>
  );
};

// ------------------------- Select Field コンポーネント ---------------------
type SelectFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  valueObjectArray: { value: string; displayName: string }[];
};

const SelectField = ({
  id,
  label,
  placeholder,
  valueObjectArray,
}: SelectFieldProps) => (
  <div>
    <FormLabel id={id}>{label}</FormLabel>
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
  </div>
);

// ------------------------- Form Label コンポーネント ---------------------
type FormLabelProps = {
  children: ReactNode;
  id: string;
  isMust?: boolean;
};

const FormLabel = ({ children, id, isMust = true }: FormLabelProps) => (
  <Label htmlFor={id} className="flex flex-row gap-2 text-sm items-end">
    {children}
    {isMust && <span className="text-xs text-red-600">必須</span>}
  </Label>
);

// ------------------------- Form Input コンポーネント ---------------------
type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  children?: ReactNode;
  isPassword?: boolean;
  onTogglePassword?: () => void;
};

const FormInput = ({ id, label, type = "text", children }: FormInputProps) => (
  <div className="flex flex-col w-full">
    <FormLabel id={id}>{label}</FormLabel>
    {children}
    <Input type={type} id={id} className="h-14 mt-2" />
  </div>
);

type FormPasswordProps = {
  id: string;
  label: string;
  type?: string;
  children?: ReactNode;
  isPassword?: boolean;
  onTogglePassword?: () => void;
};

const FormPasswordInput = ({
  id,
  label,
  type = "password",
  children,
}: FormPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-col">
      <FormLabel id={id}>{label}</FormLabel>
      {children}
      <Input
        type={isShowPassword ? "text" : type}
        id={id}
        className="h-14 mt-2"
      />
      <PasswordToggle onToggle={() => setIsShowPassword(!isShowPassword)} />
    </div>
  );
};

// ------------------------- Password Toggle コンポーネント ---------------------
type PasswordToggleProps = {
  onToggle?: () => void;
};

const PasswordToggle = ({ onToggle }: PasswordToggleProps) => (
  <div className="flex items-center space-x-1 mt-2">
    <Checkbox id="showPassword" onClick={() => onToggle && onToggle()} />
    <label
      htmlFor="showPassword"
      className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
    >
      パスワードを表示
    </label>
  </div>
);

export default LoginPage;
