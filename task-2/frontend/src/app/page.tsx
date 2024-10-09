"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faCalendarDays,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";

import { IErrors, ITransaction } from "../_types_";
import styles from "./page.module.scss";
import { transactionSchema } from "../schemas/transactionSchema";

export default function Home() {
  const [errors, setErrors] = useState<IErrors>({});
  const [formData, setFormData] = useState<ITransaction>({
    time: "",
    quantity: "",
    pillar: "",
    revenue: "",
    price: "",
  });
  const pillars = ["01", "03", "05", "06", "09"];
  const selectRef = useRef(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { id, value } = e.target;
    setFormData((preValues) => ({
      ...preValues,
      [id]: value,
    }));
  }

  const handleDateChange = (selectedDates: Date[]) => {
    const formattedDate = selectedDates.length
      ? selectedDates[0].toISOString()
      : "";
    setFormData((prevValues) => ({
      ...prevValues,
      time: formattedDate,
    }));
  };

  const validate = async () => {
    try {
      await transactionSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid) {
      alert("Form submitted successfully");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <button type='button' title='Close' className={styles["btn-close"]}>
              <FontAwesomeIcon icon={faArrowLeftLong} className={styles.icon} />
              <span>Đóng</span>
            </button>
            <h1 className={styles.heading}>Nhập giao dịch</h1>
          </div>
          <div className={styles.right}>
            <button
              type='submit'
              title='Update'
              className={styles["btn-update"]}
            >
              Cập nhật
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles["form-item"]}>
            <label htmlFor='time'>
              Thời gian
              <FontAwesomeIcon
                className={styles["icon-calendar"]}
                icon={faCalendarDays}
              />
            </label>
            <Flatpickr
              id='time'
              data-enable-time
              value={formData.time}
              options={{
                enableSeconds: true,
                dateFormat: "Y-m-d H:i:S",
              }}
              onChange={handleDateChange}
            />
          </div>
          {errors && errors?.time && (
            <span className={styles.message}>{errors.time}</span>
          )}
          <div className={styles["form-item"]}>
            <label htmlFor='quantity'>Số lượng</label>
            <input
              id='quantity'
              title='Quantity'
              placeholder='0'
              type='text'
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          {errors && errors?.quantity && (
            <span className={styles.message}>{errors.quantity}</span>
          )}
          <div className={styles["form-item"]}>
            <label htmlFor='pillar'>
              Trụ
              <FontAwesomeIcon
                className={styles["icon-down"]}
                icon={faChevronDown}
              />
            </label>
            <select
              ref={selectRef}
              id='pillar'
              value={formData.pillar}
              onChange={handleChange}
            >
              <option value=''>Chọn trụ thực hiện giao dịch</option>
              {pillars.map((pillar, index) => (
                <option key={index} value={pillar}>
                  {pillar}
                </option>
              ))}
            </select>
          </div>
          {errors && errors?.pillar && (
            <span className={styles.message}>{errors.pillar}</span>
          )}
          <div className={styles["form-item"]}>
            <label htmlFor='revenue'>Doanh thu</label>
            <input
              id='revenue'
              title='Revenue'
              placeholder='0'
              type='text'
              value={formData.revenue}
              onChange={handleChange}
            />
          </div>
          {errors && errors?.revenue && (
            <span className={styles.message}>{errors.revenue}</span>
          )}
          <div className={styles["form-item"]}>
            <label htmlFor='price'>Đơn giá</label>
            <input
              id='price'
              title='Price'
              type='text'
              value={formData.price}
              placeholder='0'
              onChange={handleChange}
            />
          </div>
          {errors && errors?.price && (
            <span className={styles.message}>{errors.price}</span>
          )}
        </div>
      </div>
    </form>
  );
}
