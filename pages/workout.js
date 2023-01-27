import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  // weight,age,ft,inch,goal
  const [weight, setWeight] = useState(220);
  const [age, setAge] = useState(25);
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(10);
  const [goal, setGoal] = useState("lose weight");

  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>7-Min AI Workout Quickstart</title>
        <link rel="icon" href="/robot_icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/robot_icon.png" className={styles.icon} />
        <h3>Workout Generator</h3>
        <form onSubmit={onSubmit}>
        <label>Weight</label>
          <input
            type="number"
            min={1}
            max={99}
            name="weight"
            placeholder="Enter the weight"
            value={weight}
            onChange={(e) => setWeight(Number.parseInt(e.target.value))}
          />

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Height</label>
          <input
            type="number"
            min={1}
            name="ft"
            placeholder="5Ft"
            value={ft}
            onChange={(e) => setFt(Number.parseInt(e.target.value))}
          />

          <label>Height</label>
          <input
            type="number"
            min={1}
            name="in"
            placeholder="10in"
            value={inch}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Hobbies</label>
          <input
            type="text"
            name="goal"
            placeholder="Lose weight or improve strength, balance ...."
            value={goal}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate Workout" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
