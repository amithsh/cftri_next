"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  room_temperature: z.number().min(0).step(1),
  code: z.number().min(0).max(1).step(1),
  chab: z.number().min(0).step(1),
  sdchab: z.number().min(0).step(1),
  L: z.number().min(0).max(100).step(1),
  a: z.number().min(-128).max(128).step(1),
  b: z.number().min(-128).max(128).step(1),
  hue_angle: z.number().min(0).max(360).step(1),
});

const Page = () => {
  const [prediction, setPrediction] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_temperature: 0,
      code: 1,
      chab: 0,
      sdchab: 0,
      L: 0,
      a: 0,
      b: 0,
      hue_angle: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

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
      const roundedDuration = Number(data.predicted_duration).toFixed(0);
      console.log("Predicted Storage Duration:", roundedDuration);
      setPrediction(roundedDuration);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="flex p-10 justify-center h-screen max-w-[1300px] gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-2 gap-12"
        >
          <FormField
            control={form.control}
            name="room_temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>select the code either MAP or P</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0" onClick={() => field.onChange("0")}>
                        MAP
                      </SelectItem>
                      <SelectItem value="1" onClick={() => field.onChange("1")}>
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
              <FormItem>
                <FormLabel>Total Chlorophyll</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>SD</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>L* (Lightness)</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>a* (Green to Red)</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>b* (Blue to Yellow)</FormLabel>
                <FormControl>
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
              <FormItem>
                <FormLabel>Hue Angle</FormLabel>
                <FormControl>
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
          <Button type="submit">Predict Storage Duration</Button>
        </form>
      </Form>
      <div className="ml-28 max-h-16 rounded-xl shadow-xl p-4 bg-green-200 flex items-center justify-center">
        <h1>
          The shelf life will be
          <span className="text-4xl font-bold ml-5">{prediction}</span>
        </h1>
      </div>
    </div>
  );
};

export default Page;
