"use client"
import { useEffect, useState } from "react"
import { Toaster, toast as hotToast } from "react-hot-toast"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function ToastContainer() {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{ duration: 4500, style: { background: "transparent", boxShadow: "none", padding: 0 } }}
    >
      {(t) => {
        const isSuccess = t.type === "success"
        const isError   = t.type === "error"
        const Icon = isSuccess ? CheckCircle2 : isError ? AlertCircle : Info
        return (
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-sm w-full text-sm",
              "bg-background text-foreground border-border",
              isSuccess && "border-l-4 border-l-success",
              isError   && "border-l-4 border-l-destructive"
            )}
          >
            <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", isSuccess && "text-success", isError && "text-destructive", !isSuccess && !isError && "text-primary")} />
            <p className="flex-1">{t.message as string}</p>
            <button onClick={() => hotToast.dismiss(t.id)} className="text-muted-foreground hover:text-foreground" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      }}
    </Toaster>
  )
}

export const toast = {
  success: (message: string) => hotToast.success(message),
  error:   (message: string) => hotToast.error(message),
  info:    (message: string) => hotToast(message),
  loading: (message: string) => hotToast.loading(message),
  dismiss: (id?: string)     => id ? hotToast.dismiss(id) : hotToast.dismiss(),
}
