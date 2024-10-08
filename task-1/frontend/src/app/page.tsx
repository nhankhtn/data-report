"use client";
import { compareTime, formatMoney, formatTime } from "@/utils";
import styles from "./page.module.scss";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file && startTime && endTime) {
      setError("");
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          const data = new Uint8Array(event.target.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData: (string | number)[][] = XLSX.utils.sheet_to_json(
            worksheet,
            { header: 1 }
          );
          calculateTotal(jsonData, startTime, endTime);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError("Please upload a file and input time range.");
    }
  };

  const calculateTotal = (
    data: (string | number)[][],
    startTime: string,
    endTime: string
  ) => {
    let total = 0;

    data.slice(8).forEach((row) => {
      const date = row[1];
      const time = row[2];
      const fullTime = `${date}T${time}`;
      const amount = parseFloat(row[8] as string);

      if (
        compareTime(fullTime, formatTime(startTime)) >= 0 &&
        compareTime(fullTime, formatTime(endTime)) <= 0
      ) {
        total += amount;
      }
    });

    setTotalAmount(total);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>DATA REPORT</h1>
      <form onSubmit={handleSubmit} className={styles["wrap-form"]}>
        <div className={styles["form-item"]}>
          <label htmlFor='file'>File</label>
          <input
            id='file'
            title='Upload file'
            type='file'
            onChange={handleFileChange}
            accept='.xlsx'
            className={styles["input-file"]}
          />
        </div>
        <div className={styles["form-item"]}>
          <label htmlFor='startTime'>From</label>
          <input
            id='startTime'
            title='Start time'
            type='datetime-local'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className={styles["input-date"]}
          />
        </div>
        <div className={styles["form-item"]}>
          <label htmlFor='endTime'>To</label>
          <input
            id='endTime'
            title='End time'
            type='datetime-local'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className={styles["input-date"]}
          />
        </div>
        <button
          title='Calculate'
          type='submit'
          className={styles["btn-calculate"]}
        >
          Calculate
        </button>
      </form>
      {error && <span className={styles.message}>{error}</span>}
      <p>Total Amount: {formatMoney(totalAmount)}</p>
    </div>
  );
}
