// Alapvető funkciók

// Naptár megjelenítése
const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Months = [
  {
    name: "January",
    short: "Jan",
    number: "01",
    days: 31
  },
  {
    name: "February",
    short: "Feb",
    number: "02",
    days: 28
  },
  {
    name: "March",
    short: "Mar",
    number: "03",
    days: 31
  },
  {
    name: "April",
    short: "Apr",
    number: "04",
    days: 30
  },
  {
    name: "May",
    short: "May",
    number: "05",
    days: 31
  },
  {
    name: "June",
    short: "Jun",
    number: "06",
    days: 30
  },
  {
    name: "July",
    short: "Jul",
    number: "07",
    days: 31
  },
  {
    name: "August",
    short: "Aug",
    number: "08",
    days: 31
  },
  {
    name: "September",
    short: "Sep",
    number: "9",
    days: 30
  },
  {
    name: "October",
    short: "Oct",
    number: "10",
    days: 31
  },
  {
    name: "November",
    short: "Nov",
    number: "11",
    days: 30
  },
  {
    name: "December",
    short: "Dec",
    number: "12",
    days: 31
  }
];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.defaultDate ? new Date(this.props.defaultDate) : new Date(),
      currentView: new Date(),
      events: this.props.events ? this.props.events : [],
      selectedTime: '12:00', // Giờ mặc định
      selectedDays: [] // Mảng chứa các ngày được chọn
    };
    this.eventIndex = {}
    this.updateEventIndex = this.updateEventIndex.bind(this)
    this.renderDays = this.renderDays.bind(this);
  }

  updateEventIndex(){
    this.eventIndex ={}
    this.eventDateIndex = {}
    this.state.events.forEach(x => {
      let splits = x.date.split("-").map(x => parseInt(x))
      console.log(splits)
      this.eventIndex["E"+ splits[0] ] = this.eventIndex["E"+ splits[0]] ? this.eventIndex["E"+ splits[0]] : {}
      this.eventIndex["E"+ splits[0] ]["E"+ splits[1] ] = this.eventIndex["E"+ splits[0] ]["E"+ splits[1] ] ? this.eventIndex["E"+ splits[0] ]["E"+ splits[1] ] : []
      this.eventIndex["E"+ splits[0] ]["E"+ splits[1] ].push(x)

      this.eventDateIndex["E"+ splits[0] ] = this.eventDateIndex["E"+ splits[0]] ? this.eventDateIndex["E"+ splits[0]] : {}
      this.eventDateIndex["E"+ splits[0] ]["E"+ splits[1] ] = this.eventDateIndex["E"+ splits[0] ]["E"+ splits[1] ] ? this.eventDateIndex["E"+ splits[0] ]["E"+ splits[1] ] : []
      this.eventDateIndex["E"+ splits[0] ]["E"+ splits[1] ].push(x.date)
    })
    console.log("eventIndex",this.eventIndex)
  }

  componentWillMount() {
    this.updateEventIndex()
  }

  renderDays() {
    let currentMonth = parseInt(this.state.currentView.getMonth())
    let currentMonth = parseInt(this.state.currentView.getMonth())
    let currentMonthInfo = Months[currentMonth];
    let prevMonthInfo = Months[currentMonth - 1 < 0 ? Months.length - 1 : currentMonth - 1]
    let nextMonthInfo = Months[currentMonth + 1 > Months.length - 1 ? 0 : currentMonth + 1]
    let currentYear = this.state.currentView.getFullYear();
    let prevMonthYear = currentYear
    let nextMonthYear = currentYear
    const total = 42

    if (currentMonthInfo.name == "February") {
      currentMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | currentMonthInfo.days
    }
    else if (prevMonthInfo.name == "February") {
      prevMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | prevMonthInfo.days
    }
    else if (nextMonthInfo.name == "February") {
      nextMonthInfo.days = (new Date(currentYear + "-" + "Feb-29").getMonth() == 2 ? false : true) | nextMonthInfo.days
    }

    if (currentMonthInfo.name == "January") {
      prevMonthYear = currentYear - 1
    }
    if (currentMonthInfo.name == "December") {
      nextMonthYear = currentYear + 1
    }

    let tempday = new Date(currentYear + "-" + currentMonthInfo.name + "-01").getDay()
    console.log("days", tempday)
    let requiredprev = (7) - (7 - tempday);
    let requirednext = 42 - (requiredprev + currentMonthInfo.days);
    console.log(requiredprev,requirednext)
    
    let prevdays = requiredprev > 0 ? Array(requiredprev).fill({}).map((x, key) => {
      x = {}
      let day = prevMonthInfo.days - key
      x.day = day
      x.monthType = "prev"
      x.year = prevMonthYear;
      let dateString = (day <10? "0"+day:day)+"-"+prevMonthInfo.name+"-"+prevMonthYear
      x.dateString = dateString
      let date = new Date(dateString)
      x.date = date
      x.dayName = Days[date.getDay()]
      return x;
    }) : [];
    prevdays.reverse()
    let nextdays = requirednext > 0 ? Array(requirednext).fill({}).map((x, key) => {
      x = {}
      let day = 1 + key
      x.day = day
      x.monthType = "next"
      x.year = nextMonthYear;
      let dateString = (day <10? "0"+day:day)+"-"+nextMonthInfo.name+"-"+nextMonthYear
      x.dateString = dateString
      let date = new Date(dateString)
      x.date = date
      x.dayName = Days[date.getDay()]
      return x;
    }) : [];

    let calendar = []
    calendar.push(...prevdays)
    let days = Array(currentMonthInfo.days).fill({}).map((x, key) => {
      x = {}
      let day =1 + key
      x.day = day
      x.monthType = "current"
      x.year = currentYear;
      let dateString = (day <10? "0"+day:day)+"-"+currentMonthInfo.name+"-"+currentYear
      x.dateString = dateString
      let date = new Date(dateString)
      x.date = date
      x.dayName = Days[date.getDay()]
      return x;
    })
    console.log(currentMonthInfo.days, days)
    calendar.push(...days)
    calendar.push(...nextdays)
    let result = _.chunk(calendar, 7)
    result = result.filter(x => {
      return x.length == 7
    })
    let selectedDate = this.state.selectedDate.toLocaleDateString()

    console.log(this.eventIndex)

    return result.map((x, key) => {
      return (
        <tr key={key}>
          {x.map((y, key) => {
            let event = false;
            let classList = "calendar-day calendar-month-" + y.monthType;

            if (y.dayName === "Sun") {
              classList += " calendar-holiday-" + y.monthType;
            }
            if (this.state.selectedDays.some(day => day.getTime() === y.date.getTime())) {
              classList += " calendar-selected-date";
            }
            if (this.eventDateIndex) {
              let year = y.date.getFullYear();
              if (this.eventDateIndex["E" + year]) {
                let month = y.date.getMonth() + 1;
                if (this.eventDateIndex["E" + year]["E" + month]) {
                  if (this.eventDateIndex["E" + year]["E" + month] && this.eventDateIndex["E" + year]["E" + month].includes(y.dateString)) {
                    event = true;
                  }
                }
              }
            }
            return (
              <td key={key} align="center" className={classList} onClick={() => {
                let sd = new Date(y.dateString);
                if ([1, 2, 4].includes(sd.getDay())) {
                  this.setState(prev => {
                    prev.selectedDate = y.date;
                    prev.selectedDays = [...prev.selectedDays, sd];
                    return prev;
                  }, () => {
                    if (this.props.onSelectionChange) {
                      this.props.onSelectionChange(y.date);
                    }
                  });
                } else {
                  console.log('Ngày không hợp lệ');
                }
              }}>
                <div>
                  {event ? <div className="day"><div className="event-round">{y.day}</div></div> : <div className="day">{y.day}</div>}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="cks-calendar">
        <div className="calendar-toolbar">
          <table>
            <tr>
              <td width="150" align="left">
                <h5>{Months[this.state.currentView.getMonth()].name} <small style={{ fontSize: "5px", verticalAlign: "middle" }}>&#9899;</small> {this.state.currentView.getFullYear()}</h5>
              </td>
              <td width="200" align="right">
                <div className="button-group">
                  <input type="text" disabled value={this.state.selectedDate.toLocaleDateString()} style={{ width: "25%" }}></input>
                  <button className="btn px-2" onClick={() => {
                    this.setState(prev => {
                      prev.currentView.setMonth(prev.currentView.getMonth() - 1)
                      return prev;
                    })
                  }}><i className="fas fa-chevron-left"></i></button>
                  <button className="btn today" onClick={() => {
                    this.setState({ currentView: new Date(), selectedDate: new Date() })
                  }}>Today</button>
                  <button className="btn px-2" onClick={() => {
                    this.setState(prev => {
                      prev.currentView.setMonth(prev.currentView.getMonth() + 1)
                      return prev;
                    })
                  }}><i className="fas fa-chevron-right"></i></button>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <table className="calendar-table">
          <tr className="calendar-days-tr">
            {Days.map((x, key) => (
              <td className="calendar-days-td" key={key} align="center">
                <div width="500">{x}</div>
              </td>
            ))}
          </tr>
          {this.renderDays()}
        </table>
        <div className="row mt-3">
          <div className="col-sm-3">
            <div style={{ height: "30px", width: "30px", borderRadius: "5px" }} className="calendar-selected-date">
            </div>
            <h5 style={{ fontSize: "14px", color: "#212121" }}>Selected Date</h5>
          </div>
          <div className="col-sm-3">
            <div style={{ height: "30px", width: "30px", borderRadius: "5px" }} className="calendar-holiday-current">
            </div>
            <h5 style={{ fontSize: "14px", color: "#212121" }}>Holiday</h5>
          </div>
          <div className="col-sm-3 day">
            <div style={{ height: "35px", width: "35px", borderRadius: "17px", backgroundColor: "#4285f4", lineHeight: "35px", color: "#fff" }}>
              <center>#</center>
            </div>
            <h5 style={{ fontSize: "14px", color: "#212121" }}>Event Dot</h5>
          </div>
          <div className="col-sm-3">
            <input
              type="time"
              value={this.state.selectedTime}
              onChange={(e) => this.setState({ selectedTime: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* demo code */
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
}
let eventDate = new Date()
eventDate.addDays(5);
eventDate = eventDate.toISOString().substr(0, 10)
console.log(eventDate)
/*  */

ReactDOM.render(
  <Calendar
    events={[{
      date: eventDate,
      eventName: "Test Event",
      eventDesc: "This is event desc."
    }]}
    onSelectionChange={(date) => {
      console.log(date)
      alert(`Selection Change Event: ${date.toLocaleDateString()}`)
    }}
  />,
  document.querySelector("#calendar-container")
);


// Beállítások mentése
function saveSettings() {
    // Ide írhatod a beállítások mentésének kódját
}

// Fizetés kiszámítása
function calculatePayment() {
    // Ide írhatod a fizetés kiszámításának kódját
}

// Eseménykezelők hozzáadása oldal betöltéskor
window.onload = function() {
    showCalendar(); // Minden funkció hívódik meg az oldal betöltésekor
    // Beállítások mentése gombra kattintáskor
    document.getElementById('save-settings-btn').onclick = function() {
        saveSettings();
    }
    // Fizetés kiszámítása gombra kattintáskor
    document.getElementById('calculate-payment-btn').onclick = function() {
        calculatePayment();
    }
}
