import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { GoogleHabit, Habit, TaskByDate } from "@/types"

const googleHabitNotCompleted: GoogleHabit = {
  kind: "tasks#task",
  id: "QTQzM2xRTi1zdkRIRU0zdg",
  etag: '"LTM5MTA0OTA0Nw"',
  title: "Home workouts ",
  updated: "2023-05-04T21:35:31.000Z",
  selfLink:
    "https://www.googleapis.com/tasks/v1/lists/UDV6dDJOc3loOFhNQ2hTaQ/tasks/QTQzM2xRTi1zdkRIRU0zdg",
  position: "00000000000000000010",
  status: "needsAction",
  due: "2023-05-05T00:00:00.000Z",
  // links: []
}

const googleHabitCompleted: GoogleHabit = {
  kind: "tasks#task",
  id: "YkszN2pmTmVVYkxlSHZNRQ",
  etag: '"MTIxMjE2NzkwOQ"',
  title: "غسل الاسنان",
  updated: "2023-10-19T14:04:09.000Z",
  selfLink:
    "https://www.googleapis.com/tasks/v1/lists/UDV6dDJOc3loOFhNQ2hTaQ/tasks/YkszN2pmTmVVYkxlSHZNRQ",
  position: "09999998302275750701",
  status: "completed",
  due: "2023-08-18T00:00:00.000Z",
  completed: "2023-10-19T14:04:09.000Z",
  hidden: true,
  links: [],
}

const googleTasks = [
  {
    id: "MVJvV053NWRUaHRyc2ZubA",
    title: "فديو معرفي",
    status: "completed",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "ajQ0TmExdU5NSFFpUDljbg",
    title: "ترتيب السرير🛏️",
    status: "completed",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "WENKelZtTnYxTF81VWlkQw",
    title: "reading book",
    status: "completed",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "b3A5S1ZwMFFlNjNoM1JDVg",
    title: "صلاه الفجر",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "WjhjTC1YNlRZU1lhUDA1cw",
    title: "قراءه ونشر احاديث",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "NDhBaXNoQUV5eXdyLW5lSg",
    title: "قراءه قرأن",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "OTE1dnlzbElhak93WS1NOQ",
    title: "صلاه العشاء",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "WnJ5UWlXQnhXR19fZFBnUw",
    title: "الصلوات الفائته",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "dW83OXVrYXEwc0lQSE9qTQ",
    title: "صلاه الظهر",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "ZnB4WVgxUW9tQ0staExGWQ",
    title: "صلاه الوتر",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "MHFGRWpVdGhKampKdU5Rag",
    title: "صلاه العصر",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "dFJjWUxYWFlZRnNTcVlpUw",
    title: "صلاه المغرب",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
  {
    id: "TjdlLTRCWmZKa29lS0E5OA",
    title: "سماع درس ديني",
    status: "needsAction",
    due: "2023-11-04T00:00:00.000Z",
  },
]

const DBHabitNotCompleted: Habit = {
  _id: "OHpYUjZMc19EdW8zQ05zWA",
  bestStreak: 0,
  category: {
    _type: "category",
    name: "google",
    _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
    _rev: "UI5KGa02sbnep2oeWLfB1p",
  },
  user: {
    _id: "Ge7QFtjd7Oo12iAJ96wbWn",
    email: "atef50895@gmail.com",
    slug: {
      current: "atef50895",
    },
    imglink:
      "https://lh3.googleusercontent.com/a/AAcHTtcDq0-CfFkrqjoVYm0Rku-LCKrzphE7G5OllGie9FpreUlK=s96-c",
    name: "Mohamed Safty",
    id: "",
    image: "",
    hashedPassword: "",
    habits: [],
  },
  categories: [
    {
      _rev: "ozYWAyX9WuVST7QtTEIYGz",
      _type: "category",
      name: "others",
      _id: "33f74555-fc90-498d-adb4-adda0d23ca73",
    },
    {
      _rev: "oT88RoYgRCgDLbhlGiMrv6",
      _type: "category",
      name: "morning",
      _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
    },
    {
      _rev: "UI5KGa02sbnep2oeWLfB1p",
      _type: "category",
      name: "google",
      _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
    },
    {
      _rev: "m2wUiRJct46GQ5hw1wETy3",
      _type: "category",
      name: "night",
      _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
    },
    {
      _rev: "ozYWAyX9WuVST7QtT44K80",
      _type: "category",
      name: "الصلاه في الجامع",
      _id: "f69f3e02-186c-4b1a-aaca-c5a492f21fe4",
    },
  ],
  _createdAt: "2023-11-03T07:44:41Z",
  name: "reading book",
  currentStreak: 0,
  dates: [],
  slug: {
    current: "1698997480074",
  },
}

const DBHabitCompleted: Habit = {
  _id: "VVBuUzJxS1VkWjljel8wVA",
  currentStreak: 1,
  bestStreak: 0,
  dates: [
    {
      _type: "dateOfHabit",
      _key: "1c88563bc0c4",
      date: getCurrentDate(),
    },
    {
      _type: "dateOfHabit",
      _key: "1c88563bc0c4",
      date: "11/3/2023",
    },
  ],
  category: {
    name: "google",
    _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
    _rev: "UI5KGa02sbnep2oeWLfB1p",
    _type: "category",
  },
  _createdAt: "2023-11-03T07:19:42Z",
  name: "صلاه الظهر",
  slug: {
    current: "1698995981267",
  },
  user: {
    name: "Mohamed Safty",
    email: "atef50895@gmail.com",
    slug: {
      current: "atef50895",
    },
    imglink:
      "https://lh3.googleusercontent.com/a/AAcHTtcDq0-CfFkrqjoVYm0Rku-LCKrzphE7G5OllGie9FpreUlK=s96-c",
    _id: "Ge7QFtjd7Oo12iAJ96wbWn",
    id: "",
    image: "",
    hashedPassword: "",
    habits: [],
  },
  categories: [
    {
      _rev: "ozYWAyX9WuVST7QtTEIYGz",
      _type: "category",
      name: "others",
      _id: "33f74555-fc90-498d-adb4-adda0d23ca73",
    },
    {
      _rev: "oT88RoYgRCgDLbhlGiMrv6",
      _type: "category",
      name: "morning",
      _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
    },
    {
      _rev: "UI5KGa02sbnep2oeWLfB1p",
      _type: "category",
      name: "google",
      _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
    },
    {
      _rev: "m2wUiRJct46GQ5hw1wETy3",
      _type: "category",
      name: "night",
      _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
    },
    {
      _rev: "ozYWAyX9WuVST7QtT44K80",
      _type: "category",
      name: "الصلاه في الجامع",
      _id: "f69f3e02-186c-4b1a-aaca-c5a492f21fe4",
    },
  ],
}

export default function getUpdatedDatesForGoogleTask(
  task: GoogleHabit,
  googleDBHabit?: Habit
): TaskByDate[] | undefined {
  const newDate = {
    date: getCurrentDate(),
    _type: "dateOfHabit",
    _key: `${Math.random().toString(32).slice(2)}-${getCurrentDate()}`,
  }
  if (googleDBHabit) {
    const isCompleted = checkTheTaskIfCompleted(
      googleDBHabit.dates,
      getCurrentDate()
    )
    if (task.status === "completed") {
      if (isCompleted) {
        console.log(1, isCompleted)
        return googleDBHabit.dates
      } else if (isCompleted === false) {
        console.log(2, isCompleted)
        return [...googleDBHabit.dates, newDate]
      }
    } else if (task.status === "needsAction") {
      if (isCompleted === false) {
        console.log(3, isCompleted)
        return googleDBHabit.dates
      } else if (isCompleted) {
        console.log(4, isCompleted)
        return googleDBHabit.dates.filter((d) => d.date !== getCurrentDate())
      }
    }
  } else if (task.status === "completed") {
    return [newDate]
  } else {
    return []
  }
}

describe("test get updated dates from google tasks", () => {
  describe("if habit found in DB", () => {
    it("if habit completed in Google and DB", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitCompleted,
        DBHabitCompleted
      )
      expect(dates?.length).toEqual(2)
    })
    it("if habit completed in google and not completed in DB", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitCompleted,
        DBHabitNotCompleted
      )
      expect(dates?.length).toEqual(1)
    })
    it("if habit not completed in google and not completed in DB", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitNotCompleted,
        DBHabitNotCompleted
      )
      expect(dates?.length).toEqual(0)
    })
    it("if habit not completed in google and completed in DB", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitNotCompleted,
        DBHabitCompleted
      )
      expect(dates?.length).toEqual(1)
    })
  })
  describe("if habit not found in DB", () => {
    it("if completed in google", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitCompleted,
        undefined
      )
      expect(dates?.length).toEqual(1)
    })
    it("if not completed in google", () => {
      const dates = getUpdatedDatesForGoogleTask(
        googleHabitNotCompleted,
        undefined
      )
      expect(dates?.length).toEqual(0)
    })
  })
})
