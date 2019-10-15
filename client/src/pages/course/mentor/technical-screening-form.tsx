import { Form, Col, Steps, Radio, Input, Button, Rate } from 'antd';
import { Header, withSession, PersonSelect } from 'components';
import { FormComponentProps } from 'antd/lib/form';
import { ary, isNumber } from 'lodash';
import withCourseData from 'components/withCourseData';
import * as React from 'react';
import { CoursePageProps } from 'services/models';

type Props = CoursePageProps & FormComponentProps;

type State = {
  currentStep: number;
  common: {
    reason: number | null;
    reasonOther: string | null;
    whenStartCoding: number | null;
    schoolChallengesParticipaton: string | null;
    whereStudied: string | null;
    workExperience: string | null;
    otherAchievements: string | null;
    militaryService: number | null;
  };
  skills: {
    htmlCss: number | null;
    binaryNumber: number | null;
    oop: number | null;
    bigONotation: number | null;
    dataStructures: {
      array: number | null;
      list: number | null;
      stack: number | null;
      queue: number | null;
      tree: number | null;
      hashTable: number | null;
      heap: number | null;
    };
    sortingAndSearchAlgorithms: number | null;
    comment: string | null;
  };
  programmingTask: {
    task: string | null;
    codeWritingLevel: number | null;
    comment: string | null;
  };
};

enum FormSteps {
  COMMON_INFO = 0,
  SKILLS = 1,
  PROGRAMMING_TASK = 2,
  ENGLISH = 3,
  RESUME = 4,
};

class TechnicalScreeningForm extends React.Component<Props, State> {
  state: State = {
    currentStep: FormSteps.COMMON_INFO,
    common: {
      reason: null,
      reasonOther: null,
      whenStartCoding: null,
      schoolChallengesParticipaton: null,
      whereStudied: null,
      workExperience: null,
      otherAchievements: null,
      militaryService: null,
    },
    skills: {
      htmlCss: null,
      binaryNumber: null,
      oop: null,
      bigONotation: null,
      dataStructures: {
        array: null,
        list: null,
        stack: null,
        queue: null,
        tree: null,
        hashTable: null,
        heap: null,
      },
      sortingAndSearchAlgorithms: null,
      comment: null,
    },
    programmingTask: {
      task: null,
      codeWritingLevel: null,
      comment: null,
    },
  };

  async componentDidMount() {
    // const courseId = this.props.course.id;

    // const courseTasks = await this.courseService.getCourseTasksForTaskOwner(courseId);

    // this.setState({ courseTasks });
  }

  yearValidator = (_: any, value: number, callback: (isInvalid?: boolean) => {}) => {
    const range = 100;
    const year = Number(value);

    const isInRange = new Date().getFullYear() - year <= range;

    return (isNumber(year) && isInRange) ? callback() : callback(true);
  }

  render() {
    const { getFieldDecorator: field, getFieldValue } = this.props.form;
    const { currentStep } = this.state;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const isLastStep = (currentStep: number) => !Object.values(FormSteps).includes(currentStep + 1);
    const isFirstStep = (currentStep: number) => !Object.values(FormSteps).includes(currentStep - 1);

    const onButtonNextClick = () => {
      let { currentStep } = this.state;
      currentStep = !isLastStep(currentStep)
        ? currentStep += 1
        : currentStep;

      this.setState({ currentStep });
    }

    const onButtonPrevClick = () => {
      let { currentStep } = this.state;
      currentStep = !isFirstStep(currentStep)
        ? currentStep -= 1
        : currentStep;

      this.setState({ currentStep});
    }

    return (
      <>
        <Header
          title="Technical Screening Form"
          courseName={this.props.course.name}
          username={this.props.session.githubId}
        />
        <Col className="m-2" sm={12}>
          <Form layout="vertical">
            <Form.Item label="Student">
              {field('studentId', { rules: [{ required: true, message: 'Please select a student' }]})(
                <PersonSelect data={[]} disabled={!getFieldValue('studentId')} />,
              )}
            </Form.Item>
            <Form.Item>
              <Steps
                current={currentStep}
                onChange={(currentStep: number) => this.setState({ currentStep })}
              >
                <Steps.Step title="Common info" />
                <Steps.Step title="Skills" />
                <Steps.Step title="Programming task" />
                <Steps.Step title="English" />
                <Steps.Step title="Resume" />
              </Steps>
            </Form.Item>
            {
              ary(() => {
                switch (currentStep) {
                  case FormSteps.COMMON_INFO: {
                    return (
                      <>
                        <Form.Item label="Почему проявили интерес к этим курсам">
                          {field('reason', {
                            initialValue: this.state.common.reason,
                            rules: [{ required: true, message: 'Please select a reason' }],
                          })(
                            <Radio.Group
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                reason: e.target.value,
                              }})}
                            >
                              <Radio style={radioStyle} value={1}>
                                Имею образование в сфере IT и хочется изучить JS
                              </Radio>
                              <Radio style={radioStyle} value={2}>
                                Не связан с IT/не техническое образование,
                                но хотелось бы переквалифицироваться и трудоустроится в сфере IT
                              </Radio>
                              <Radio style={radioStyle} value={3}>
                                Было интересно узнать о чём это вообще
                              </Radio>
                              <Radio style={radioStyle} value={4}>
                                Other...
                                {
                                  this.state.common.reason === 4
                                  ? field('reasonOther', {
                                    initialValue: this.state.common.reasonOther,
                                    rules: [{ required: false }],
                                  })(
                                    <Input
                                      style={{  width: 300, marginLeft: 10 }}
                                      onChange={(e) => this.setState({ common: {
                                        ...this.state.common,
                                        reasonOther: e.target.value,
                                      }})}
                                    />,
                                  )
                                  : null
                                }
                              </Radio>
                            </Radio.Group>,
                          )}
                        </Form.Item>
                        <Form.Item label="Когда начал(а) писать код?">
                          {field('whenStartCoding', {
                            initialValue: this.state.common.whenStartCoding,
                            rules: [
                              {
                                validator: this.yearValidator,
                                message: 'The input is not valid year!',
                              },
                              { required: true, message: 'Please input a year' },
                            ],
                          })(
                            <Input
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                whenStartCoding: Number(e.target.value),
                              }})}
                              placeholder='2019'
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Где учился (вуз/специальность)?">
                          {field('whereStudied', {
                            initialValue: this.state.common.whereStudied,
                            rules: [{ required: true, message: 'Please type university name and a specialty' }],
                          })(
                            <Input
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                whereStudied: e.target.value,
                              }})}
                              placeholder='BSU/Economist (2014 - 2019)'
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Опыт работы (включая не только IT)">
                          {field('workExperience', {
                            initialValue: this.state.common.workExperience,
                            rules: [{ required: true, message: 'Please type work experience' }],
                          })(
                            <Input
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                workExperience: e.target.value,
                              }})}
                              placeholder='Accountant (2 years)'
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="В каких школьных олимпиадах принимал(а) участие (любых)?">
                          {field('schoolChallengesParticipaton', {
                            initialValue: this.state.common.schoolChallengesParticipaton,
                            rules: [{ required: false }],
                          })(
                            <Input
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                schoolChallengesParticipaton: e.target.value,
                              }})}
                              placeholder='Math, English'
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Другие достижения">
                          {field('otherAchievements', {
                            initialValue: this.state.common.otherAchievements,
                            rules: [{ required: false }],
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                otherAchievements: e.target.value,
                              }})}
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Military Service">
                          {field('militaryService', {
                            initialValue: this.state.common.militaryService,
                            rules: [{ required: true, message: 'Please select a military status' }],
                          })(
                            <Radio.Group
                              onChange={(e) => this.setState({ common: {
                                ...this.state.common,
                                militaryService: e.target.value,
                              }})}
                            >
                              <Radio style={radioStyle} value={1}>
                                Отслужил
                              </Radio>
                              <Radio style={radioStyle} value={2}>
                                Не годен или не военнообязан(а)
                              </Radio>
                              <Radio style={radioStyle} value={3}>
                                Годен (не служил)
                              </Radio>
                            </Radio.Group>,
                          )}
                        </Form.Item>
                      </>
                    )
                  }
                  case FormSteps.SKILLS: {
                    return (
                      <>
                        <Form.Item label="HTML/CSS">
                          {field('htmlCss', {
                            initialValue: this.state.skills.htmlCss,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of HTML/CSS knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(htmlCss) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Binary number">
                          {field('binaryNumber', {
                            initialValue: this.state.skills.binaryNumber,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Binary number knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(binaryNumber) => this.setState({ skills: {
                                ...this.state.skills,
                                binaryNumber,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="OOP (Encapsulation, Polymorphism and Inheritance)">
                          {field('oop', {
                            initialValue: this.state.skills.oop,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of OOP knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(oop) => this.setState({ skills: {
                                ...this.state.skills,
                                oop,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Big O notation">
                          {field('bigONotation', {
                            initialValue: this.state.skills.bigONotation,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Big O notation knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(bigONotation) => this.setState({ skills: {
                                ...this.state.skills,
                                bigONotation,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Array). Representation in computer memory. Complexity. Differences with List.">
                          {field('array', {
                            initialValue: this.state.skills.dataStructures.array,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Array knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(array) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  array,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (List). Representation in computer memory. Complexity. Differences with Array.">
                          {field('list', {
                            initialValue: this.state.skills.dataStructures.list,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of List knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(list) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  list,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Stack). Representation in computer memory. Complexity. Differences with Queue.">
                          {field('stack', {
                            initialValue: this.state.skills.dataStructures.stack,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Stack knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(stack) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  stack,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Queue). Representation in computer memory. Complexity. Differences with Stack.">
                          {field('queue', {
                            initialValue: this.state.skills.dataStructures.queue,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Queue knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(queue) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  queue,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Tree). Representation in computer memory. Binary tree. Complexity.">
                          {field('tree', {
                            initialValue: this.state.skills.dataStructures.tree,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Tree knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(tree) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  tree,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Hash table)">
                          {field('hashTable', {
                            initialValue: this.state.skills.dataStructures.hashTable,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Hash table knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(hashTable) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  hashTable,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Data Structures (Heap)">
                          {field('heap', {
                            initialValue: this.state.skills.dataStructures.heap,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Heap knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(heap) => this.setState({ skills: {
                                ...this.state.skills,
                                dataStructures: {
                                  ...this.state.skills.dataStructures,
                                  heap,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Sorting and search algorithms (Binary search, Bubble sort, Quick sort, etc.)">
                          {field('sortingAndSearchAlgorithms', {
                            initialValue: this.state.skills.sortingAndSearchAlgorithms,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Sorting and search algorithms knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(sortingAndSearchAlgorithms) => this.setState({ skills: {
                                ...this.state.skills,
                                sortingAndSearchAlgorithms,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Comment">
                          {field('skillsComment', {
                            initialValue: this.state.skills.comment,
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ skills: {
                                ...this.state.skills,
                                comment: e.target.value,
                              }})}
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
                      </>
                    )
                  }
                  case FormSteps.PROGRAMMING_TASK: {
                    return (
                      <>
                        <Form.Item label="Какую задачу / задачи решал">
                          {field('programmingTask', {
                            initialValue: this.state.programmingTask.task,
                            rules: [{
                              required: true,
                              message: 'Please type the task!',
                            }],
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ programmingTask: {
                                ...this.state.programmingTask,
                                task: e.target.value,
                              }})}
                              placeholder='aaabbcc = 3a2b2c'
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Уверенность написания кода">
                          {field('codeWritingLevel', {
                            initialValue: this.state.programmingTask.codeWritingLevel,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of coding!',
                            }],
                          })(
                            <Rate
                              onChange={(codeWritingLevel) => this.setState({ programmingTask: {
                                ...this.state.programmingTask,
                                codeWritingLevel,
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Comment">
                          {field('programmingTaskComment', {
                            initialValue: this.state.programmingTask.comment,
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ programmingTask: {
                                ...this.state.programmingTask,
                                comment: e.target.value,
                              }})}
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
                      </>
                    )
                  }
                  case FormSteps.ENGLISH: {
                    return (
                      <>4
                      </>
                    )
                  }
                  case FormSteps.RESUME: {
                    return (
                      <>5
                      </>
                    )
                  }
                }
              })()
            }
            {
              !isFirstStep(currentStep)
                && <Button onClick={onButtonPrevClick} style={{ marginRight: 10 }}>
                Prev
              </Button>
            }
            {
              !isLastStep(currentStep)
                && <Button onClick={onButtonNextClick}>
                  Next
              </Button>
            }
          </Form>
        </Col>
      </>
    );
  }
}

export default withCourseData(withSession(Form.create()(TechnicalScreeningForm), 'mentor'));
