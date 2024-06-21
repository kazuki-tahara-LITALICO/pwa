"use client";

import React, { ReactNode, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-3xl text-left font-bold mt-6">ログイン</h1>
      <div className="space-y-5 mt-8">
        <FormInput id="input5" label="サンプルID" type="number">
          <span className="text-xs text-gray-400 mt-2">
            半角数字 ハイフンなし
          </span>
        </FormInput>
        <FormPasswordInput id="input7" label="パスワード">
          <span className="text-xs text-gray-400 mt-2">
            半角英数字 8~16文字
          </span>
        </FormPasswordInput>
        <Button onClick={() => router.push("/my_page")}>ログイン</Button>
        <Button
          className="underline p-0 font-bold text-base mt-10"
          variant="link"
        >
          パスワードお忘れの方
        </Button>
        <div>
          <div className="bg-gray-100 py-4 px-6 space-y-2 rounded-lg mt-14">
            <Button
              className="justify-start underline p-0 font-bold text-sm"
              variant="link"
            >
              サンプルの取り扱いについて
            </Button>
            <Button
              className="justify-start underline p-0 font-bold text-sm"
              variant="link"
            >
              サンプルについて
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

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
