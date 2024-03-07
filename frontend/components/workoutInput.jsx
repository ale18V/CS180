import * as React from "react";
import { useEffect } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import WorkoutSelect from "./workoutSelect.jsx";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WorkoutInput = () => {
  const [routine, setRoutine] = React.useState("");
  const [username2, setUsername2] = React.useState("");

  const { handleSubmit, control, reset, formState, formState: { isSubmitSuccessful }, formState: { errors } } = useForm({
    defaultValues: {
      exercise_id: '',
      weight: '',
      reps: '',
      sets: '',
      rest: '',
      day: new Date(),
    }
  });

  const onSubmit = async data => {
    await sleep(2000);
    try {
      const username = await AsyncStorage.getItem("username");

      const newTemplate = { exercise: data.exercise_id, weight: data.weight, reps: data.reps, set: data.sets, rest: data.rest, day: data.day };
      //alert(JSON.stringify(newTemplate));
      let updatedTemplates = [];
      const storedTemplates = await AsyncStorage.getItem(username+"@workoutLogs");
      if (storedTemplates !== null) {
        updatedTemplates = JSON.parse(storedTemplates);
      }
      //alert(JSON.stringify(updatedTemplates));
      updatedTemplates.push(newTemplate);
      console.log(JSON.stringify(newTemplate));
      console.log(JSON.stringify(updatedTemplates));
      await AsyncStorage.setItem(
        username+"@workoutLogs",
        JSON.stringify(updatedTemplates)
      ); 
    } catch (error) {
      alert(error.message);
    }
    //alert(JSON.stringify(data));
    //props.toggle.bind(this, false);
    /* try {
      const workoutSubmit = await fetch(
        "http://localhost:8000/api/v1/exercise/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );

      const workout = await workoutSubmit.json();

      // Check if the response was successful
      if (!workoutSubmit.ok) {
        throw new Error(workout.detail || "Something went wrong");
      }

    } catch (error) {
      alert(error.message);
    } */
  };

  //console.log('errors', errors);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        weight: '',
        reps: '',
        sets: '',
        rest: '',
        day: new Date(),
      });
    }

    /* setUsername2(username);
    console.log(username2); */
  }, [formState, reset])


  return (

    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>

        <Text style={styles.header}>My Workouts</Text>


          {<Controller
            control={control}
            name="exercise_id"
            defaultValue=""
            rules={{
              required: { value: true, message: "Required input" },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.exercise_id && <Text style={styles.text}> {errors.exercise_id.message}</Text>}
                <WorkoutSelect routine={routine} setRoutine={setRoutine} workout={value} setWorkout={workout => { onChange(workout) }}/>
              </>
            )}
          />}


          <Text style={styles.label}>Weight lifted:</Text>
          <Controller
            control={control}
            name="weight"
            defaultValue=""
            rules={{
              required: { value: true, message: "Required input" },
              max: { value: 500, message: "Invalid input" },
              min: { value: 0, message: "Cannot be negative" },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.weight && <Text style={styles.text}> {errors.weight.message}</Text>}
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder={''}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                />
              </>
            )}
          />

          <Text style={styles.label}>Reps done:</Text>
          <Controller
            control={control}
            name="reps"
            defaultValue=""
            rules={{
              required: { value: true, message: "Required input" },
              max: { value: 100, message: "Invalid input" },
              min: { value: 1, message: "Can't do less than one rep" },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.reps && <Text style={styles.text}> {errors.reps.message}</Text>}
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder={''}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                />
              </>
            )}
          />

          <Text style={styles.label}>Sets done:</Text>
          <Controller
            control={control}
            name="sets"
            defaultValue=""
            rules={{
              required: { value: true, message: "Required input" },
              max: { value: 100, message: "Invalid input" },
              min: { value: 1, message: "Can't do less than one set" },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.sets && <Text style={styles.text}> {errors.sets.message}</Text>}
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder={''}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                />
              </>
            )}
          />

          <Text style={styles.label}>Rest interval:</Text>
          <Controller
            control={control}
            name="rest"
            defaultValue=""
            rules={{
              required: { value: true, message: "Required input" },
              max: { value: 500, message: "Invalid input" },
              min: { value: 0, message: "Cannot be negative" },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {errors.rest && <Text style={styles.text}> {errors.rest.message}</Text>}
                <TextInput
                  style={styles.input}
                  value={value}
                  placeholder={''}
                  onChangeText={(text) => {
                    onChange(text);
                  }}
                />
              </>
            )}
          />

          <Text style={styles.label}>Date:</Text>
          <Controller
            control={control}
            name='day'
            defaultValue={new Date()}
            render={({ field }) => (
              <DateTimePicker
                value={field.value || new Date()} // Provide a default value if value is empty
                mode="date" // You can use "time" or "datetime" for different modes
                is24Hour={true}
                timeZoneName={'US/Pacific'}
                display="default"
                onChange={(event, selectedDate) => {
                  const localDate = new Date(selectedDate);
                  field.onChange(localDate);
                }}
              />
            )}
          />

          <View style={styles.button}>
            <Button
              title="Submit"
              color="#f3fff5"
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          {/* <View style={styles.button}>
            <Button
              title="Done"
              color="#f3fff5"
              onPress={props.toggle.bind(this, false)}
            />
          </View> */}
        </View>


        {/* <Text> {routine} </Text>
        <Text> {workout} </Text> */}
      </ScrollView>
    </View>
  )

};

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  text: {
    color: 'red',
    marginLeft: 0,
  },
  button: {
    marginTop: 20,
    color: '#f3fff5',
    height: 40,
    backgroundColor: '#58a1a3',
    borderRadius: 4,
  },
  buttonLab: {
    color: '#58a1a3',
  },
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 8,
    backgroundColor: '#white',
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  header: {
    fontSize: 30,
    textAlign: 'left',
    margin: 5,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
});

export default WorkoutInput;


//date for sql as yyyy-mm-dd
//date saved as utc meaning it's offset from local time 
//need to process date for use in table 