import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const TopPage = () => {
  const router = useRouter();

  return (
    <div className="mt-40 w-full">
      <h1 className="text-3xl text-center font-normal">アプリアプリ</h1>
      <div className="space-y-4 mt-10">
        <p className="text-center font-normal text-sm">
          サンプルサンプルご利用の方
        </p>
        <Button onClick={() => router.push("/login")}>新規登録</Button>
      </div>
      <div className="space-y-4 mt-6">
        <p className="text-center font-normal text-sm">
          サンプルサンプル・サンプルサンプル
        </p>
        <Button variant="outline">ログイン</Button>
      </div>
    </div>
  );
};

export default TopPage;
