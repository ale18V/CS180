from models.exercise import ExercieseBase
from models.user import UserBase
from models.workout import WorkoutBase
from models.plan import PlanBase
from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional

from models.routine import RoutineBase


class User(UserBase, table=True):
    # optional because it's generated by db. When we create the obj we don't have it
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str

    plans: List["Plan"] = Relationship(back_populates="creator")
    exercises: List["Exercise"] = Relationship(back_populates="creator")


class Plan(PlanBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    creator_id: int = Field(foreign_key="user.id", nullable=False, default=None)
    creator: "User" = Relationship(back_populates="plans")
    routines: List["Routine"] = Relationship(back_populates="workout_plan")


class RoutineExerciseLink(SQLModel, table=True):
    routine_id: Optional[int] = Field(default=None, primary_key=True,
                                      foreign_key="routine.id")
    exercise_id: Optional[int] = Field(default=None, primary_key=True, foreign_key="exercise.id")


class Routine(RoutineBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    plan_id: int = Field(foreign_key="plan.id", nullable=False)
    workout_plan: "Plan" = Relationship(back_populates="routines")
    workouts: List["Workout"] = Relationship(back_populates="routine")
    exercises: List["Exercise"] = Relationship(
        back_populates="routines", link_model=RoutineExerciseLink)


class Workout(WorkoutBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    routine_id: int = Field(foreign_key="routine.id")

    routine: "Routine" = Relationship(back_populates="workouts")
    exercise_links: List["WorkoutExerciseLink"] = Relationship(back_populates="workout")


class WorkoutExerciseLink(SQLModel, table=True):
    workout_id: int = Field(primary_key=True, foreign_key="workout.id")
    exercise_id: int = Field(primary_key=True, foreign_key="exercise.id")
    sets: Optional[int] = None
    reps: Optional[int] = None
    seconds_of_rest: Optional[int] = None
    weight: Optional[float] = None

    workout: "Workout" = Relationship(back_populates="exercise_links")
    exercise: "Exercise" = Relationship(back_populates="workout_links")


class Exercise(ExercieseBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    creator_id: int = Field(default=None, nullable=False, foreign_key="user.id")

    creator: User = Relationship(back_populates="exercises")
    routines: List["Routine"] = Relationship(
        back_populates="exercises", link_model=RoutineExerciseLink)
    workout_links: List["WorkoutExerciseLink"] = Relationship(back_populates="exercise")
