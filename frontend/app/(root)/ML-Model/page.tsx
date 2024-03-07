"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, date, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  room_temperature: z.number(),
  code: z.number().min(0).max(1),
  chab: z.number().min(32).max(39),
  sdchab: z.number().min(0).step(1),
  L: z.number().min(0).max(100).step(1),
  a: z.number().min(-128).max(128).step(1),
  b: z.number().min(-128).max(128).step(1),
  hue_angle: z.number().min(0).max(360).step(1),
});

const Page = () => {
  const [prediction, setPrediction] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_temperature: 0,
      code: 0,
      chab: 0,
      sdchab: 0,
      L: 0,
      a: 0,
      b: 0,
      hue_angle: 0,
    },
  });

  console.log("this is predictions", prediction);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();

      setPrediction(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="flex flex-col h-auto p-10 items-center justify-center   bg-black gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="   min-w-[700px] max-w-[700px] text-white "
        >
          <FormField
            control={form.control}
            name="room_temperature"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Temperature</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>select the code either MAP or Control</FormLabel>
                <FormControl className="bg-slate-900">
                  <Select>
                    <SelectTrigger className="w-[180px] bg-slate-900">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="0"
                        onClick={() => {
                          console.log("Clicked on MAP");
                          field.onChange("0");
                          form.setValue("code", 0); // Update the 'code' value in the form state
                        }}
                      >
                        MAP
                      </SelectItem>
                      <SelectItem
                        value="1"
                        onClick={() => {
                          console.log("Clicked on P");
                          field.onChange("1");
                          form.setValue("code", 1); // Update the 'code' value in the form state
                        }}
                      >
                        P
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chab"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Total Chlorophyll (choose between 32-39)</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sdchab"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>SD</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="L"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>L* (Lightness)</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="a"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>a* (Green to Red)</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="b"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>b* (Blue to Yellow)</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hue_angle"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Hue Angle</FormLabel>
                <FormControl className="bg-slate-900">
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-7 bg-slate-700">
            Predict Storage Duration
          </Button>
        </form>
      </Form>

      {prediction &&
        Object.entries(prediction).map(([modelName, modelData]) => (
          <div className="  min-w-[700px] max-w-[700px] text-white rounded-xl shadow-xl p-4 bg-lime-700  justify-center">
            <div key={modelName} className="grid-cols-3 gap-3">
              <div className="">
                <h3 className="mb-2">{modelName}</h3>
                <p>Accuracy: {modelData?.accuracy}</p>
                <p>Predicted Duration: {modelData?.predicted_duration}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Page;
