import { useState, useEffect } from "react";

import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  BarChart3,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";


// ==================================================
// BACKEND URL
// ==================================================

const API_URL = "https://jobtracker-api-ipem.onrender.com";


// ==================================================
// HELPER - Convert backend job to frontend job
// ==================================================

function convertJob(job) {
  return {
    id: job.id,
    company: job.company,
    position: job.position,
    location: job.location || "",
    status: job.status,
    salary: job.salary || "",
    appliedDate: job.applied_date || "",
    jobUrl: job.job_url || "",
    notes: job.notes || "",
  };
}


// ==================================================
// LAYOUT
// ==================================================

function Layout({ children }) {

  const [open, setOpen] = useState(false);

  const nav = [
    ["/dashboard", "Dashboard", LayoutDashboard],
    ["/jobs", "Applications", ClipboardList],
    ["/jobs/add", "Add Application", Plus],
  ];

  return (
    <div className="app-shell">

      <aside className={open ? "sidebar open" : "sidebar"}>

        <div className="brand">
          <div className="brand-mark">JT</div>
          <span>JobTrack</span>
        </div>

        <nav>

          {nav.map(([to, label, Icon]) => (

            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <NavLink
            to="/profile"
            className="nav-item"
          >
            <CircleUserRound size={19} />
            <span>Profile</span>
          </NavLink>

          <button className="nav-item logout">
            <LogOut size={19} />
            <span>Logout</span>
          </button>

        </div>

      </aside>


      <div className="main-area">

        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>


          <div className="topbar-search">

            <Search size={18} />

            <input
              placeholder="Search applications..."
            />

          </div>


          <div className="top-actions">

            <button className="icon-btn">
              <Settings size={19} />
            </button>

            <div className="avatar">
              E
            </div>

          </div>

        </header>


        <main>
          {children}
        </main>

      </div>

    </div>
  );
}


// ==================================================
// DASHBOARD
// ==================================================

function Dashboard({ jobs }) {

  const stats = [

    [
      "Total Applications",
      jobs.length,
      ClipboardList,
      "neutral",
    ],

    [
      "Applied",
      jobs.filter(
        (job) => job.status === "Applied"
      ).length,
      TrendingUp,
      "blue",
    ],

    [
      "Interviews",
      jobs.filter(
        (job) => job.status === "Interview"
      ).length,
      Users,
      "orange",
    ],

    [
      "Offers",
      jobs.filter(
        (job) => job.status === "Offer"
      ).length,
      BarChart3,
      "green",
    ],

  ];


  return (

    <Layout>

      <section className="page">

        <div className="page-head">

          <div>

            <p className="eyebrow">
              OVERVIEW
            </p>

            <h1>
              Good afternoon, Eesha 👋
            </h1>

            <p className="muted">
              Here's what's happening with your job search.
            </p>

          </div>


          <Link
            className="primary-btn"
            to="/jobs/add"
          >
            <Plus size={18} />
            Add application
          </Link>

        </div>


        <div className="stats-grid">

          {stats.map(
            ([label, value, Icon, kind]) => (

              <div
                className="stat-card"
                key={label}
              >

                <div
                  className={`stat-icon ${kind}`}
                >
                  <Icon size={20} />
                </div>

                <div>

                  <p>{label}</p>

                  <strong>
                    {value}
                  </strong>

                </div>

              </div>

            )
          )}

        </div>


        <div className="content-grid">


          <div className="panel">

            <div className="panel-head">

              <div>

                <h2>
                  Recent applications
                </h2>

                <p className="muted">
                  Your latest job applications
                </p>

              </div>


              <Link
                to="/jobs"
                className="text-link"
              >
                View all
                <ChevronRight size={16} />
              </Link>

            </div>


            <div className="table-wrap">

              <table>

                <thead>

                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>

                </thead>


                <tbody>

                  {jobs
                    .slice(0, 5)
                    .map((job) => (

                      <tr key={job.id}>

                        <td>

                          <div className="company-cell">

                            <div className="company-logo">
                              {job.company?.[0]}
                            </div>

                            <b>
                              {job.company}
                            </b>

                          </div>

                        </td>


                        <td>
                          {job.position}
                        </td>


                        <td>
                          <Status
                            status={job.status}
                          />
                        </td>


                        <td>
                          {formatDate(
                            job.appliedDate
                          )}
                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </div>


          <div className="panel tips">

            <div className="panel-head">

              <div>

                <h2>
                  Job search tips
                </h2>

                <p className="muted">
                  Keep your momentum going
                </p>

              </div>

            </div>


            <div className="tip">

              <div className="tip-number">
                1
              </div>

              <div>

                <b>
                  Follow up after interviews
                </b>

                <p>
                  Send a short thank-you message within 24 hours.
                </p>

              </div>

            </div>


            <div className="tip">

              <div className="tip-number">
                2
              </div>

              <div>

                <b>
                  Track every application
                </b>

                <p>
                  Keep notes so you never lose context.
                </p>

              </div>

            </div>


            <div className="tip">

              <div className="tip-number">
                3
              </div>

              <div>

                <b>
                  Apply consistently
                </b>

                <p>
                  Set a weekly application target and stick to it.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </Layout>

  );
}


// ==================================================
// STATUS
// ==================================================

function Status({ status }) {

  return (

    <span
      className={`status ${status.toLowerCase()}`}
    >
      {status}
    </span>

  );

}


// ==================================================
// DATE FORMAT
// ==================================================

function formatDate(date) {

  if (!date) {
    return "—";
  }

  return new Date(
    date + "T00:00:00"
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

}


// ==================================================
// JOBS PAGE
// ==================================================

function Jobs({ jobs, setJobs }) {

  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState("All");


  const filtered = jobs.filter(
    (job) =>

      (filter === "All" ||
        job.status === filter)

      &&

      `${job.company} ${job.position} ${job.location}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );


  const remove = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this application?"
      );

    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API_URL}/jobs/${id}`,
          {
            method: "DELETE",
          }
        );


      if (!response.ok) {

        throw new Error(
          "Failed to delete job"
        );

      }


      setJobs(
        jobs.filter(
          (job) => job.id !== id
        )
      );


    } catch (error) {

      console.error(
        "Error deleting job:",
        error
      );

      alert(
        "Failed to delete application."
      );

    }

  };


  return (

    <Layout>

      <section className="page">

        <div className="page-head">

          <div>

            <p className="eyebrow">
              APPLICATIONS
            </p>

            <h1>
              Job applications
            </h1>

            <p className="muted">
              Track and manage every opportunity in one place.
            </p>

          </div>


          <Link
            className="primary-btn"
            to="/jobs/add"
          >
            <Plus size={18} />
            Add application
          </Link>

        </div>


        <div className="toolbar">

          <div className="search-box">

            <Search size={18} />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search by company, role or location..."
            />

          </div>


          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >

            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>

          </select>

        </div>


        <div className="panel">

          <div className="table-wrap">

            <table>

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Salary</th>
                  <th>Applied</th>
                  <th></th>
                </tr>

              </thead>


              <tbody>

                {filtered.map((job) => (

                  <tr key={job.id}>

                    <td>

                      <div className="company-cell">

                        <div className="company-logo">
                          {job.company?.[0]}
                        </div>

                        <b>
                          {job.company}
                        </b>

                      </div>

                    </td>


                    <td>
                      {job.position}
                    </td>


                    <td>
                      {job.location || "—"}
                    </td>


                    <td>
                      <Status
                        status={job.status}
                      />
                    </td>


                    <td>
                      {job.salary || "—"}
                    </td>


                    <td>
                      {formatDate(
                        job.appliedDate
                      )}
                    </td>


                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          remove(job.id)
                        }
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>

                    </td>

                  </tr>

                ))}


                {filtered.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="empty"
                    >
                      No applications found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </Layout>

  );

}


// ==================================================
// ADD JOB
// ==================================================

function AddJob({ jobs, setJobs }) {

  const nav = useNavigate();


  const [form, setForm] =
    useState({

      company: "",
      position: "",
      location: "",
      status: "Applied",
      salary: "",
      appliedDate:
        new Date()
          .toISOString()
          .slice(0, 10),
      jobUrl: "",
      notes: "",

    });


  const [saving, setSaving] =
    useState(false);


  const change = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,

    });

  };


  const submit = async (e) => {

    e.preventDefault();


    if (saving) {
      return;
    }


    setSaving(true);


    try {

      const response =
        await fetch(
          `${API_URL}/jobs`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              company:
                form.company,

              position:
                form.position,

              location:
                form.location,

              status:
                form.status,

              salary:
                form.salary,

              applied_date:
                form.appliedDate,

              job_url:
                form.jobUrl,

              notes:
                form.notes,

            }),

          }
        );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "Backend error:",
          errorText
        );

        throw new Error(
          "Failed to save application"
        );

      }


      const data =
        await response.json();


      const newJob =
        convertJob(data);


      setJobs([
        ...jobs,
        newJob,
      ]);


      nav("/jobs");


    } catch (error) {

      console.error(
        "Error adding job:",
        error
      );

      alert(
        "Failed to save application. Please try again."
      );


    } finally {

      setSaving(false);

    }

  };


  return (

    <Layout>

      <section className="page narrow">

        <div className="page-head">

          <div>

            <p className="eyebrow">
              NEW APPLICATION
            </p>

            <h1>
              Add application
            </h1>

            <p className="muted">
              Save the details of a new opportunity.
            </p>

          </div>

        </div>


        <form
          className="panel form"
          onSubmit={submit}
        >

          <div className="form-grid">


            <Field
              label="Company"
              name="company"
              value={form.company}
              onChange={change}
              placeholder="e.g. Google"
              required
            />


            <Field
              label="Position"
              name="position"
              value={form.position}
              onChange={change}
              placeholder="e.g. Software Engineer"
              required
            />


            <Field
              label="Location"
              name="location"
              value={form.location}
              onChange={change}
              placeholder="e.g. Bangalore"
            />


            <Field
              label="Salary"
              name="salary"
              value={form.salary}
              onChange={change}
              placeholder="e.g. ₹12 LPA"
            />


            <div className="field">

              <label>
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={change}
              >

                <option>
                  Applied
                </option>

                <option>
                  Interview
                </option>

                <option>
                  Offer
                </option>

                <option>
                  Rejected
                </option>

              </select>

            </div>


            <Field
              label="Applied date"
              name="appliedDate"
              type="date"
              value={form.appliedDate}
              onChange={change}
            />


            <Field
              label="Job URL"
              name="jobUrl"
              type="url"
              value={form.jobUrl}
              onChange={change}
              placeholder="https://company.com/careers/job"
            />

          </div>


          <div className="field">

            <label>
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={change}
              placeholder="Add interview notes, links, contacts, etc."
              rows="5"
            />

          </div>


          <div className="form-actions">

            <Link
              className="secondary-btn"
              to="/jobs"
            >
              Cancel
            </Link>


            <button
              className="primary-btn"
              type="submit"
              disabled={saving}
            >

              {saving
                ? "Saving..."
                : "Save application"}

            </button>

          </div>

        </form>

      </section>

    </Layout>

  );

}


// ==================================================
// FIELD
// ==================================================

function Field({
  label,
  ...props
}) {

  return (

    <div className="field">

      <label>
        {label}
      </label>

      <input {...props} />

    </div>

  );

}


// ==================================================
// LOGIN
// ==================================================

function Login() {

  const nav = useNavigate();


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="brand centered">

          <div className="brand-mark">
            JT
          </div>

          <span>
            JobTrack
          </span>

        </div>


        <h1>
          Welcome back
        </h1>

        <p className="muted">
          Sign in to manage your job search.
        </p>


        <form
          className="form"
          onSubmit={(e) => {

            e.preventDefault();

            nav("/dashboard");

          }}
        >

          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />


          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />


          <button
            className="primary-btn full"
            type="submit"
          >

            <LogIn size={18} />

            Sign in

          </button>

        </form>


        <p className="auth-switch">

          Don't have an account?

          {" "}

          <Link to="/register">
            Create one
          </Link>

        </p>

      </div>

    </div>

  );

}


// ==================================================
// REGISTER
// ==================================================

function Register() {

  const nav = useNavigate();


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="brand centered">

          <div className="brand-mark">
            JT
          </div>

          <span>
            JobTrack
          </span>

        </div>


        <h1>
          Create your account
        </h1>

        <p className="muted">
          Start tracking your applications today.
        </p>


        <form
          className="form"
          onSubmit={(e) => {

            e.preventDefault();

            nav("/dashboard");

          }}
        >

          <Field
            label="Name"
            placeholder="Your name"
            required
          />


          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />


          <Field
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />


          <button
            className="primary-btn full"
            type="submit"
          >
            Create account
          </button>

        </form>


        <p className="auth-switch">

          Already have an account?

          {" "}

          <Link to="/login">
            Sign in
          </Link>

        </p>

      </div>

    </div>

  );

}


// ==================================================
// PROFILE
// ==================================================

function Profile() {

  return (

    <Layout>

      <section className="page narrow">

        <div className="page-head">

          <div>

            <p className="eyebrow">
              ACCOUNT
            </p>

            <h1>
              Profile
            </h1>

            <p className="muted">
              Your personal information.
            </p>

          </div>

        </div>


        <div className="panel profile-card">

          <div className="big-avatar">
            E
          </div>


          <div>

            <h2>
              Eesha
            </h2>

            <p className="muted">
              eesha@example.com
            </p>

            <p className="muted">
              Frontend Developer · Open to opportunities
            </p>

          </div>

        </div>

      </section>

    </Layout>

  );

}


// ==================================================
// JOB DETAILS
// ==================================================

function JobDetails({ jobs }) {

  const { id } =
    useParams();


  const job =
    jobs.find(
      (job) =>
        String(job.id) === id
    );


  return (

    <Layout>

      <section className="page narrow">

        <Link
          className="text-link"
          to="/jobs"
        >
          ← Back to applications
        </Link>


        <div className="panel detail">

          <div className="company-logo large">

            {job?.company?.[0] || "?"}

          </div>


          <h1>
            {job?.position ||
              "Application"}
          </h1>


          <h2>
            {job?.company ||
              "Unknown company"}
          </h2>


          <Status
            status={
              job?.status ||
              "Applied"
            }
          />


          <div className="detail-grid">

            <div>

              <span>
                Location
              </span>

              <b>
                {job?.location || "—"}
              </b>

            </div>


            <div>

              <span>
                Salary
              </span>

              <b>
                {job?.salary || "—"}
              </b>

            </div>


            <div>

              <span>
                Applied
              </span>

              <b>
                {job?.appliedDate
                  ? formatDate(
                      job.appliedDate
                    )
                  : "—"}
              </b>

            </div>


            <div>

              <span>
                Job URL
              </span>

              <b>

                {job?.jobUrl ? (

                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open job
                  </a>

                ) : (
                  "—"
                )}

              </b>

            </div>

          </div>


          {job?.notes && (

            <div className="detail-notes">

              <span>
                Notes
              </span>

              <p>
                {job.notes}
              </p>

            </div>

          )}

        </div>

      </section>

    </Layout>

  );

}


// ==================================================
// APP
// ==================================================

export default function App() {

  const [jobs, setJobs] =
    useState([]);


  useEffect(() => {

    fetch(`${API_URL}/jobs`)

      .then((response) => {

        if (!response.ok) {

          throw new Error(
            "Failed to fetch jobs"
          );

        }

        return response.json();

      })

      .then((data) => {

        const convertedJobs =
          data.map(convertJob);

        setJobs(convertedJobs);

      })

      .catch((error) => {

        console.error(
          "Error fetching jobs:",
          error
        );

      });

  }, []);


  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <Dashboard
            jobs={jobs}
          />
        }
      />

      <Route
        path="/jobs"
        element={
          <Jobs
            jobs={jobs}
            setJobs={setJobs}
          />
        }
      />

      <Route
        path="/jobs/add"
        element={
          <AddJob
            jobs={jobs}
            setJobs={setJobs}
          />
        }
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/jobs/:id"
        element={
          <JobDetails
            jobs={jobs}
          />
        }
      />

    </Routes>

  );

}