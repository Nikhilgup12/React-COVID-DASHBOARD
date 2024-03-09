// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccineAge} = props
  const data = vaccineAge
  return (
    <>
      <div className="vaccineGender-container">
        <h1 className="vaccineCoverage-heading">Vaccination by Age </h1>
        <div className="chart-container">
          <PieChart width={1000} height={300}>
            <Pie
              cx="50%"
              cy="40%"
              data={data}
              startAngle={0}
              endAngle={360}
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="male" fill="#5a8dee" />
              <Cell name="female" fill="#a3df9f" />
              <Cell name="count" fill="#64c2a6" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </div>
      </div>
    </>
  )
}
export default VaccinationByAge
