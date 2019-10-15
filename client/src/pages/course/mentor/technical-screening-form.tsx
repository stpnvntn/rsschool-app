import { Form, Col, Steps, Radio, Input, Button, Rate, Typography } from 'antd';
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
    htmlCss: {
      tags: number | null;
      positionAtribute: number | null;
      displayAttribute: number | null;
      weightsOfSelectors: number | null;
      pseudoClassesElements: number | null;
      boxModel: number | null;
      relativeAbsolute: number | null;
      semantics: number | null;
    };
    dataStructures: {
      array: number | null;
      list: number | null;
      stack: number | null;
      queue: number | null;
      tree: number | null;
      hashTable: number | null;
      heap: number | null;
    };
    common: {
      binaryNumber: number | null;
      oop: number | null;
      bigONotation: number | null;
      sortingAndSearchAlgorithms: number | null;
    };
    comment: string | null;
  };
  programmingTask: {
    task: string | null;
    codeWritingLevel: number | null;
    comment: string | null;
  };
  english: {
    levelAccordingToStudent: number | null;
    levelAccordingToMentor: number | null;
    whereAndWhenLearned: string | null;
    comment: string | null;
  }
  resume: {
    verdict: number | null;
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

const SKILLS_LEVELS = [
  `Doesn't know`,
  `Poor knowledge (almost doesn't know)`,
  'Knows something (with tips)',
  'Good knowledge (makes not critical mistakes)',
  'Great knowledge',
];

const CODING_LEVELS = [
  `Isn't able to coding`,
  `Poor coding ability (almost isn't able to)`,
  'Codes something (with tips)',
  'Good coding ability (makes not critical mistakes)',
  'Great coding ability',
];

const ENGLISH_LEVELS = [
  'A0',
  'A1',
  'A1+',
  'A2',
  'A2+',
  'B1',
  'B1+',
  'B2',
  'B2+',
  'C1',
  'C1+',
  'C2',
];

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
      htmlCss: {
        tags: null,
        positionAtribute: null,
        displayAttribute: null,
        weightsOfSelectors: null,
        pseudoClassesElements: null,
        boxModel: null,
        relativeAbsolute: null,
        semantics: null,
      },
      dataStructures: {
        array: null,
        list: null,
        stack: null,
        queue: null,
        tree: null,
        hashTable: null,
        heap: null,
      },
      common: {
        binaryNumber: null,
        oop: null,
        bigONotation: null,
        sortingAndSearchAlgorithms: null,
      },
      comment: null,
    },
    programmingTask: {
      task: null,
      codeWritingLevel: null,
      comment: null,
    },
    english: {
      levelAccordingToStudent: null,
      levelAccordingToMentor: null,
      whereAndWhenLearned: null,
      comment: null,
    },
    resume: {
      verdict: null,
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
                labelPlacement='vertical'
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
                        <Typography.Title level={4}>HTML/CSS</Typography.Title>
                        <Form.Item label="Tags">
                          {field('tags', {
                            initialValue: this.state.skills.htmlCss.tags,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Tags knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(tags) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  tags,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.tags
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.tags - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Position atribute values">
                          {field('positionAtribute', {
                            initialValue: this.state.skills.htmlCss.positionAtribute,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Position attribute values knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(positionAtribute) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  positionAtribute,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.positionAtribute
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.positionAtribute - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Display atribute values">
                          {field('displayAttribute', {
                            initialValue: this.state.skills.htmlCss.displayAttribute,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Display attribute values knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(displayAttribute) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  displayAttribute,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.displayAttribute
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.displayAttribute - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Weight of selectors">
                          {field('weightsOfSelectors', {
                            initialValue: this.state.skills.htmlCss.weightsOfSelectors,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Weight of selectors knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(weightsOfSelectors) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  weightsOfSelectors,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.weightsOfSelectors
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.weightsOfSelectors - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Pseudo classes and elements">
                          {field('pseudoClassesElements', {
                            initialValue: this.state.skills.htmlCss.pseudoClassesElements,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Pseudo classes and elements knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(pseudoClassesElements) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  pseudoClassesElements,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.pseudoClassesElements
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.pseudoClassesElements - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Box model">
                          {field('boxModel', {
                            initialValue: this.state.skills.htmlCss.boxModel,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Box model knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(boxModel) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  boxModel,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.boxModel
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.boxModel - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="em vs rem, relative and absolute values">
                          {field('relativeAbsolute', {
                            initialValue: this.state.skills.htmlCss.relativeAbsolute,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of em vs rem, relative and absolute values knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(relativeAbsolute) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  relativeAbsolute,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.relativeAbsolute
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.relativeAbsolute - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Semantics (What is it? Semantic tags)">
                          {field('semantics', {
                            initialValue: this.state.skills.htmlCss.semantics,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Semantics knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(semantics) => this.setState({ skills: {
                                ...this.state.skills,
                                htmlCss: {
                                  ...this.state.skills.htmlCss,
                                  semantics,
                                },
                              }})}
                              tooltips={SKILLS_LEVELS}
                            />,
                          )}
                          {
                            this.state.skills.htmlCss.semantics
                            ? <span className="ant-rate-text">
                              {
                                SKILLS_LEVELS[this.state.skills.htmlCss.semantics - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Typography.Title level={4}>Data structures</Typography.Title>
                        <Typography.Paragraph>
                          Representation in computer memory. Operations' complexity.
                        </Typography.Paragraph>
                        <Form.Item label="Array (Differences with List)">
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
                        <Form.Item label="List (Differences with Array)">
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
                        <Form.Item label="Stack (Differences with Queue)">
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
                        <Form.Item label="Queue (Differences with Stack)">
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
                        <Form.Item label="Tree (Binary tree)">
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
                        <Form.Item label="Hash table">
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
                        <Form.Item label="Heap">
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
                        <Typography.Title level={4}>Common of CS / Programming</Typography.Title>
                        <Form.Item label="OOP (Encapsulation, Polymorphism and Inheritance)">
                          {field('oop', {
                            initialValue: this.state.skills.common.oop,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of OOP knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(oop) => this.setState({ skills: {
                                ...this.state.skills,
                                common: {
                                  ...this.state.skills.common,
                                  oop,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Binary number">
                          {field('binaryNumber', {
                            initialValue: this.state.skills.common.binaryNumber,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Binary number knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(binaryNumber) => this.setState({ skills: {
                                ...this.state.skills,
                                common: {
                                  ...this.state.skills.common,
                                  binaryNumber,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Big O notation">
                          {field('bigONotation', {
                            initialValue: this.state.skills.common.bigONotation,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Big O notation knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(bigONotation) => this.setState({ skills: {
                                ...this.state.skills,
                                common: {
                                  ...this.state.skills.common,
                                  bigONotation,
                                },
                              }})}
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="Sorting and search algorithms (Binary search, Bubble sort, Quick sort, etc.)">
                          {field('sortingAndSearchAlgorithms', {
                            initialValue: this.state.skills.common.sortingAndSearchAlgorithms,
                            rules: [{
                              required: true,
                              message: 'Please specify estimated level of Sorting and search algorithms knowledge!',
                            }],
                          })(
                            <Rate
                              onChange={(sortingAndSearchAlgorithms) => this.setState({ skills: {
                                ...this.state.skills,
                                common: {
                                  ...this.state.skills.common,
                                  sortingAndSearchAlgorithms,
                                },
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
                              tooltips={CODING_LEVELS}
                            />,
                          )}
                          {
                            this.state.programmingTask.codeWritingLevel
                            ? <span className="ant-rate-text">
                              {
                                CODING_LEVELS[this.state.programmingTask.codeWritingLevel - 1]
                              }
                            </span>
                            : ''
                          }
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
                      <>
                        <Form.Item label="English level according to student">
                          {field('levelAccordingToStudent', {
                            initialValue: this.state.english.levelAccordingToStudent,
                            rules: [{ required: true, message: 'Please specify estimated level of English level!' }],
                          })(
                            <Rate
                              onChange={(levelAccordingToStudent) => this.setState({ english: {
                                ...this.state.english,
                                levelAccordingToStudent,
                              }})}
                              tooltips={ENGLISH_LEVELS.filter((_, idx) => idx % 2 !== 0)}
                              count={6}
                              allowHalf={true}
                            />,
                          )}
                          {
                            this.state.english.levelAccordingToStudent
                            ? <span className="ant-rate-text">
                              {
                                ENGLISH_LEVELS[(this.state.english.levelAccordingToStudent * 2) - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Where and when learned English?">
                          {field('whereAndWhenLearned', {
                            initialValue: this.state.english.whereAndWhenLearned,
                            rules: [{ required: false }],
                          })(
                            <Input
                              onChange={(e) => this.setState({ english: {
                                ...this.state.english,
                                whereAndWhenLearned: e.target.value,
                              }})}
                              placeholder='Self-education / International House 2019'
                            />,
                          )}
                        </Form.Item>
                        <Form.Item label="English level according to you. Ask student to tell about himself, hobby, favorite book or film, and so on. (2-3 minutes)">
                          {field('levelAccordingToMentor', {
                            initialValue: this.state.english.levelAccordingToMentor,
                            rules: [{ required: true, message: 'Please specify estimated level of English level!' }],
                          })(
                            <Rate
                              onChange={(levelAccordingToMentor) => this.setState({ english: {
                                ...this.state.english,
                                levelAccordingToMentor,
                              }})}
                              tooltips={ENGLISH_LEVELS.filter((_, idx) => idx % 2 !== 0)}
                              count={6}
                              allowHalf={true}
                            />,
                          )}
                          {
                            this.state.english.levelAccordingToMentor
                            ? <span className="ant-rate-text">
                              {
                                ENGLISH_LEVELS[(this.state.english.levelAccordingToMentor * 2) - 1]
                              }
                            </span>
                            : ''
                          }
                        </Form.Item>
                        <Form.Item label="Comment">
                          {field('englishComment', {
                            initialValue: this.state.english.comment,
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ english: {
                                ...this.state.english,
                                comment: e.target.value,
                              }})}
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
                      </>
                    )
                  }
                  case FormSteps.RESUME: {
                    return (
                      <>
                        <Form.Item label="Are you take the student in your group?">
                          {field('verdict', {
                            initialValue: this.state.resume.verdict,
                            rules: [{ required: true, message: 'Please select a verdict!' }],
                          })(
                            <Radio.Group
                              onChange={(e) => this.setState({ resume: {
                                ...this.state.resume,
                                verdict: e.target.value,
                              }})}
                            >
                              <Radio style={radioStyle} value={1}>
                                Yes, I am.
                              </Radio>
                              <Radio style={radioStyle} value={2}>
                                No, I am not.
                              </Radio>
                              <Radio style={radioStyle} value={3}>
                                No, I am not, but he / she is a good candidate.
                              </Radio>
                            </Radio.Group>,
                          )}
                        </Form.Item>
                        <Form.Item label="Comment">
                          {field('resumeComment', {
                            initialValue: this.state.resume.comment,
                          })(
                            <Input.TextArea
                              onChange={(e) => this.setState({ resume: {
                                ...this.state.resume,
                                comment: e.target.value,
                              }})}
                              autosize={{ minRows: 3, maxRows: 5 }}
                            />,
                          )}
                        </Form.Item>
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
            {
              isLastStep(currentStep)
                && <>
                  <Button type="primary" style={{ marginRight: 10 }}>
                    Save
                  </Button>
                  <Button type="danger" htmlType="submit">
                    Submit
                  </Button>
                </>
            }
          </Form>
        </Col>
      </>
    );
  }
}

export default withCourseData(withSession(Form.create()(TechnicalScreeningForm), 'mentor'));
