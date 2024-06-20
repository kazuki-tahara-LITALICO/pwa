import React from "react";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <>
      <h1 className="text-3xl text-center font-normal">
        サンプルタイトルアプリ
      </h1>

      <div className="space-y-4 w-full mt-10">
        <p className="text-center font-normal text-sm">
          サンプルサンプルご利用の方
        </p>
        <Button>新規登録</Button>
      </div>
      <div className="space-y-4 w-full mt-6">
        <p className="text-center font-normal text-sm">
          サンプルサンプル・サンプルサンプル
        </p>
        <Button variant="outline">ログイン</Button>
      </div>
    </>
  );
};

export default LoginPage;
