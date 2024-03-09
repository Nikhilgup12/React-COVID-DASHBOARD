import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccineGender} = props
  const data = vaccineGender
  return (
    <>
      <div className="vaccineGender-container">
        <h1 className="vaccineCoverage-heading">Vaccination by gender </h1>
        <div className="chart-container">
          <PieChart width={1000} height={300}>
            <Pie
              cx="50%"
              cy="40%"
              data={data}
              startAngle={0}
              endAngle={180}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="male" fill=" #f54394" />
              <Cell name="female" fill="#5a8dee" />
              <Cell name="count" fill="#2cc6c6" />
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
export default VaccinationByGender
