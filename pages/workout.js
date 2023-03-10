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

  const [loading,setLoading]= useState(false)
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    if (loading){
      return;
    }
    setLoading(true)
    try {
      const response = await fetch("/api/generate-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ weight, age, ft, inch, goal }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replaceAll('\n',"<br />"));

      setWeight("");
      setAge("");
      setFt("");
      setInch("");
      setGoal("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title> 7 Minute Workout Generator AI</title>
        <link rel="icon" href="/robot_icon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/robot_icon.png" className={styles.icon} />
        <h3> 7 Minute Workout Generator AI </h3>
        <form onSubmit={onSubmit}>
        <label>Weight</label>
          <input
            type="number"
            min={1}
            max={500}
            name="weight"
            placeholder="Enter the weight"
            value={weight}
            onChange={(e) => setWeight(Number.parseInt(e.target.value))}
          />

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={200}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Height feet</label>
          <input
            type="number"
            min={1}
            name="ft"
            placeholder="5Ft"
            value={ft}
            onChange={(e) => setFt(Number.parseInt(e.target.value))}
          />

          <label>Height Inch</label>
          <input
            type="number"
            min={1}
            name="in"
            placeholder="10in"
            value={inch}
            onChange={(e) => setInch(Number.parseInt(e.target.value))}
          />

          <label>Goals</label>
          <input
            type="text"
            name="goal"
            placeholder="Lose weight or improve strength, balance ...."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <input type="submit" value="Generate Workout" />
        </form>
        {loading && (
          <div>
            <h3> Looking for the perfect 7-Min AI Workout ????</h3>
            <img src="/workout.gif" className={styles.loading} />
          </div>
        )}
        {result &&(
          <div
           className={styles.result}
           dangerouslySetInnerHTML={{ __html: result }}
         />
        )}  
      </main>
    </div>
  );
}
