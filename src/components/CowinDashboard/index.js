import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstrant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    vaccineCoverage: [],
    vaccineGender: [],
    vaccineAge: [],
    apiStatus: apiStatusConstrant.initial,
  }

  componentDidMount() {
    this.getCowinVaccine()
  }

  getFormatedVaccine = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
    age: data.age,
    count: data.count,
    gender: data.gender,
  })

  getCowinVaccine = async () => {
    this.setState({apiStatus: apiStatusConstrant.loading})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const fetchData = await response.json()
      const vaccineCover = fetchData.last_7_days_vaccination.map(eachvaccine =>
        this.getFormatedVaccine(eachvaccine),
      )
      const vaccineGender = fetchData.vaccination_by_gender.map(eachvaccine =>
        this.getFormatedVaccine(eachvaccine),
      )
      const vaccineAge = fetchData.vaccination_by_age.map(eachvaccine =>
        this.getFormatedVaccine(eachvaccine),
      )
      this.setState({
        vaccineCoverage: vaccineCover,
        vaccineGender,
        vaccineAge,
        apiStatus: apiStatusConstrant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstrant.failure})
    }
  }

  renderSuccess = () => {
    const {vaccineAge, vaccineCoverage, vaccineGender} = this.state
    return (
      <div className="vaccine-container">
        <VaccinationCoverage vaccineCoverage={vaccineCoverage} />
        <VaccinationByGender vaccineGender={vaccineGender} />
        <VaccinationByAge vaccineAge={vaccineAge} />
      </div>
    )
  }

  renderFailure = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          className="failure-image"
          alt="failure view"
        />
        <h1 className="failure-para"> Something went wrong </h1>
      </div>
    </>
  )

  renderLoading = () => (
    <div data-testid="loader" className="loading">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderShowResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstrant.success:
        return this.renderSuccess()
      case apiStatusConstrant.failure:
        return this.renderFailure()
      case apiStatusConstrant.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-container">
        <div className="CowinDashboard-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="cowin-logo"
            alt="website logo"
          />
          <h1 className="cowin-heading"> Co- WIN </h1>
        </div>
        <h1 className="cowin-para"> CoWin Vaccination in India </h1>
        <div className="CowinDashboard-container">
          {this.renderShowResult()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
